import { LitElement, html, css, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import {
  CARD_TAG,
  DEFAULT_CARD_TITLE,
  DEFAULT_MESSAGE_PLACEHOLDER,
  DEFAULT_NOTIFICATION_TITLE,
  EDITOR_TAG,
} from "./const";
import { normalizeTargets, sendToTarget, targetDisplayName, type CardConfig, type CardTarget } from "./shared";
import type { HomeAssistant } from "./types";

@customElement(CARD_TAG)
export class MultiSelectNotifyCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: CardConfig;
  @state() private _message = "";
  @state() private _title = "";
  @state() private _selected: Set<string> = new Set();
  @state() private _error = "";

  public static getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_TAG);
  }

  public static getStubConfig(entities: string[] = []): CardConfig {
    const first = entities.find((e) => e.startsWith("notify."));
    return {
      card_title: DEFAULT_CARD_TITLE,
      notification_title: DEFAULT_NOTIFICATION_TITLE,
      message_placeholder: DEFAULT_MESSAGE_PLACEHOLDER,
      targets: first ? [{ service: first.slice("notify.".length), label: "" }] : [],
    };
  }

  public static styles = css`
    :host {
      display: block;
    }
    .wrap {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px 16px 16px;
    }
    .targets {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .hint {
      color: var(--secondary-text-color);
      padding: 4px 0;
    }
    ha-input {
      width: 100%;
    }
    .message {
      width: 100%;
      box-sizing: border-box;
      min-height: 96px;
      padding: 12px 12px 10px;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 10px);
      background: var(
        --ha-color-form-background,
        var(--secondary-background-color, transparent)
      );
      color: var(--primary-text-color);
      font: inherit;
      line-height: 1.4;
      resize: vertical;
      outline: none;
    }
    .message::placeholder {
      color: var(--secondary-text-color);
    }
    .message:focus {
      border-color: var(--primary-color);
    }
    .error {
      color: var(--error-color);
      font-size: 0.9em;
      background: color-mix(in srgb, var(--error-color) 10%, transparent);
      border-radius: 8px;
      padding: 8px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }
    .dismiss {
      background: none;
      border: none;
      color: var(--error-color);
      cursor: pointer;
      text-decoration: underline;
      font-size: inherit;
      padding: 0;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
    }
  `;

  public setConfig(config: Partial<CardConfig> & Record<string, unknown>): void {
    const targets = normalizeTargets(config?.targets);
    const messagePlaceholder =
      config?.message_placeholder ?? config?.label ?? DEFAULT_MESSAGE_PLACEHOLDER;

    this._config = {
      ...(config as CardConfig),
      card_title: config?.card_title ?? DEFAULT_CARD_TITLE,
      notification_title: config?.notification_title ?? DEFAULT_NOTIFICATION_TITLE,
      message_placeholder: String(messagePlaceholder),
      label: String(messagePlaceholder),
      targets,
    };

    this._title = this._config.notification_title ?? DEFAULT_NOTIFICATION_TITLE;
    this._message = "";
    // v1 parity: checkboxes start unchecked; the user picks targets per send.
    this._selected = new Set();
    this._error = "";
  }

  public getCardSize(): number {
    const count = this._config?.targets?.length ?? 0;
    return Math.max(3, 2 + count);
  }

  private _onToggle(service: string): void {
    const next = new Set(this._selected);
    if (next.has(service)) next.delete(service);
    else next.add(service);
    this._selected = next;
  }

  private _onTitle(ev: Event): void {
    this._title = (ev.target as HTMLInputElement).value ?? "";
  }

  private _onMessage(ev: Event): void {
    this._message = (ev.target as HTMLTextAreaElement).value ?? "";
  }

  private _onKeydown(ev: KeyboardEvent): void {
    if (ev.code === "Enter" && ev.ctrlKey) {
      ev.preventDefault();
      void this._send();
    }
  }

  private async _send(): Promise<void> {
    const hass = this.hass;
    const config = this._config;
    if (!hass || !config) return;

    const message = this._message.trim();
    if (!message) return;
    const selected = (config.targets ?? []).filter((t) => this._selected.has(t.service));
    if (selected.length === 0) return;

    const title = this._title.trim();
    const data = config.data;
    const entity = typeof config.entity === "string" ? config.entity : undefined;

    const failures: string[] = [];
    const promises: Array<Promise<{ service: string; error?: string } | null>> = [];

    for (const target of selected) {
      const outcome = sendToTarget(hass, target.service, { message, title, data, entity });
      if (outcome.error) {
        failures.push(targetDisplayName(hass, target));
        continue;
      }
      const name = targetDisplayName(hass, target);
      promises.push(
        outcome.promise!
          .then(() => null)
          .catch(() => ({ service: name })),
      );
    }

    const settled = await Promise.all(promises);
    for (const r of settled) {
      if (r) failures.push(r.service);
    }

    if (failures.length > 0) {
      this._error = `Failed to send to: ${failures.join(", ")}`;
    } else {
      this._error = "";
      this._message = "";
    }
  }

  protected render(): TemplateResult {
    const config = this._config;
    if (!config) return html``;

    const targets: CardTarget[] = config.targets ?? [];

    return html`
      <ha-card .header=${config.card_title ?? DEFAULT_CARD_TITLE}>
        <div class="wrap">
          ${targets.length === 0
            ? html`<div class="hint">
                No targets configured yet. Edit the card to pick notification targets.
              </div>`
            : html`
                <div class="targets">
                  ${targets.map(
                    (t) => html`
                      <ha-checkbox
                        .checked=${this._selected.has(t.service)}
                        @change=${() => this._onToggle(t.service)}
                        aria-label=${targetDisplayName(this.hass, t)}
                      >
                        ${targetDisplayName(this.hass, t)}
                      </ha-checkbox>
                    `,
                  )}
                </div>
              `}

          <ha-input
            label="Notification title"
            .value=${this._title}
            @input=${this._onTitle}
          ></ha-input>

          <!-- Native textarea: ha-textarea is not defined on dashboards (HA
               lazy-loads it only for config dialogs), so a custom card cannot
               rely on it. Styled below to match the HA form look. -->
          <textarea
            class="message"
            placeholder=${config.message_placeholder ?? DEFAULT_MESSAGE_PLACEHOLDER}
            .value=${this._message}
            @input=${this._onMessage}
            @keydown=${this._onKeydown}
            rows="4"
          ></textarea>

          ${this._error
            ? html`<div class="error">
                <span>${this._error}</span>
                <button class="dismiss" @click=${() => (this._error = "")}>
                  Dismiss
                </button>
              </div>`
            : nothing}

          <div class="actions">
            <ha-button appearance="filled" variant="brand" @click=${() => void this._send()}>
              Send
            </ha-button>
          </div>
        </div>
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_TAG]: MultiSelectNotifyCard;
  }
}
