import { LitElement, html, css, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import {
  CARD_TAG,
  DEFAULT_CARD_TITLE,
  DEFAULT_MESSAGE_PLACEHOLDER,
  DEFAULT_NOTIFICATION_TITLE,
  EDITOR_TAG,
  GENERIC_SEND_MESSAGE,
} from "./const";
import {
  fireEvent,
  humanizeKey,
  normalizeTargets,
  parseService,
  type CardTarget,
} from "./shared";
import type { HomeAssistant } from "./types";

interface AvailableTarget {
  /** Stored service key. */
  key: string;
  /** Entity id when a notify.* entity backs this target, else null. */
  entity: string | null;
  /** True when only the legacy per-target service exists (no entity). */
  legacyOnly: boolean;
}

@customElement(EDITOR_TAG)
export class MultiSelectNotifyCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: Record<string, unknown> & { targets?: CardTarget[] };
  @state() private _filter = "";
  @state() private _custom = "";

  public static styles = css`
    :host {
      display: block;
    }
    .wrap {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    ha-input {
      width: 100%;
    }
    .hint {
      color: var(--secondary-text-color);
      font-size: 0.9em;
      line-height: 1.4;
    }
    .target-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      padding: 12px;
      max-height: 280px;
      overflow: auto;
    }
    .target-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .target-name {
      flex: 1;
      min-width: 0;
    }
    .target-name .name {
      font-size: 1em;
    }
    .target-name .key {
      font-family: var(--ha-font-family-code, monospace);
      font-size: 0.85em;
      color: var(--secondary-text-color);
      word-break: break-all;
    }
    .legacy-badge {
      color: var(--warning-color, var(--secondary-text-color));
      font-size: 0.8em;
    }
    .label-input {
      width: 200px;
      flex-shrink: 0;
    }
    .custom-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .custom-row ha-input {
      flex: 1;
    }
  `;

  public setConfig(config: Record<string, unknown>): void {
    this._config = { ...config, targets: normalizeTargets(config?.targets) };
    this._filter = "";
    this._custom = "";
  }

  private _emit(next: Record<string, unknown>): void {
    this._config = next;
    fireEvent(this, "config-changed", { config: next });
  }

  private _setField(field: string, value: string): void {
    const next = { ...this._config, [field]: value };
    if (field === "message_placeholder") {
      next.label = value;
    }
    this._emit(next);
  }

  private _setLabel(service: string, label: string): void {
    const targets = [...(this._config?.targets ?? [])];
    const idx = targets.findIndex((t) => t.service === service);
    if (idx < 0) return;
    targets[idx] = { ...targets[idx], label };
    this._emit({ ...this._config, targets });
  }

  private _toggleTarget(service: string): void {
    const targets = [...(this._config?.targets ?? [])];
    const idx = targets.findIndex((t) => t.service === service);
    if (idx >= 0) targets.splice(idx, 1);
    else targets.push({ service, label: "" });
    this._emit({ ...this._config, targets });
  }

  private _availableTargets(): AvailableTarget[] {
    const hass = this.hass;
    const out = new Map<string, AvailableTarget>();
    const states = hass?.states ?? {};
    const services = hass?.services?.notify ?? {};

    for (const key of Object.keys(services)) {
      if (key === GENERIC_SEND_MESSAGE) continue;
      const entityId = `notify.${key}`;
      out.set(key, {
        key,
        entity: states[entityId] ? entityId : null,
        legacyOnly: !states[entityId],
      });
    }
    for (const entityId of Object.keys(states)) {
      if (!entityId.startsWith("notify.")) continue;
      const key = entityId.slice("notify.".length);
      if (!out.has(key)) {
        out.set(key, { key, entity: entityId, legacyOnly: false });
      }
    }

    return [...out.values()].sort((a, b) => {
      if (a.legacyOnly !== b.legacyOnly) return a.legacyOnly ? 1 : -1;
      return a.key.localeCompare(b.key);
    });
  }

  private _optionName(option: AvailableTarget): string {
    const friendly = option.entity
      ? this.hass?.states?.[option.entity]?.attributes?.friendly_name
      : undefined;
    if (typeof friendly === "string" && friendly.trim()) return friendly.trim();
    return humanizeKey(option.key) || option.key;
  }

  private _addCustom(): void {
    const raw = this._custom.trim();
    if (!raw) return;

    let stored = raw;
    if (raw.startsWith("notify.")) stored = raw.slice("notify.".length);

    const parsed = parseService(stored);
    if (!parsed) return;
    const final =
      parsed.domain === "notify" ? parsed.service : `${parsed.domain}.${parsed.service}`;

    const targets = [...(this._config?.targets ?? [])];
    if (!targets.some((t) => t.service === final)) {
      targets.push({ service: final, label: "" });
      this._emit({ ...this._config, targets });
    }
    this._custom = "";
  }

  protected render(): TemplateResult {
    const config = this._config;
    if (!config) return html``;

    const selected = new Set((config.targets ?? []).map((t) => t.service));
    const filter = this._filter.trim().toLowerCase();
    const options = this._availableTargets().filter(
      (o) =>
        !filter ||
        o.key.toLowerCase().includes(filter) ||
        this._optionName(o).toLowerCase().includes(filter),
    );

    return html`
      <div class="wrap">
        <ha-input
          label="Card title"
          .value=${(config.card_title as string) ?? DEFAULT_CARD_TITLE}
          @input=${(e: Event) =>
            this._setField("card_title", (e.target as HTMLInputElement).value)}
        ></ha-input>

        <ha-input
          label="Message placeholder"
          .value=${(config.message_placeholder as string) ??
          (config.label as string) ??
          DEFAULT_MESSAGE_PLACEHOLDER}
          @input=${(e: Event) =>
            this._setField("message_placeholder", (e.target as HTMLInputElement).value)}
        ></ha-input>

        <ha-input
          label="Default notification title"
          .value=${(config.notification_title as string) ?? DEFAULT_NOTIFICATION_TITLE}
          @input=${(e: Event) =>
            this._setField("notification_title", (e.target as HTMLInputElement).value)}
        ></ha-input>

        <div class="hint">
          Pick the notification targets offered on the card. Entity-backed targets use the
          notify.send_message action; legacy targets fall back to their notify service.
          Labels are inferred automatically and can be overridden below.
        </div>

        <ha-input
          label="Filter targets"
          .value=${this._filter}
          @input=${(e: Event) => (this._filter = (e.target as HTMLInputElement).value)}
        ></ha-input>

        <div class="target-list">
          ${options.length === 0
            ? html`<div class="hint">
                No notification targets found${filter ? " for this filter" : ""}.
              </div>`
            : nothing}
          ${options.map((option) => {
            const isSelected = selected.has(option.key);
            const currentLabel =
              (config.targets ?? []).find((t) => t.service === option.key)?.label ?? "";
            return html`
              <div class="target-row">
                <ha-checkbox
                  .checked=${isSelected}
                  @change=${() => this._toggleTarget(option.key)}
                  aria-label=${this._optionName(option)}
                ></ha-checkbox>
                <div class="target-name">
                  <div class="name">${this._optionName(option)}</div>
                  <div class="key">${option.key}${option.legacyOnly ? " (legacy)" : ""}</div>
                </div>
                ${isSelected
                  ? html`<ha-input
                      class="label-input"
                      label="Label override"
                      .value=${currentLabel}
                      @input=${(e: Event) =>
                        this._setLabel(option.key, (e.target as HTMLInputElement).value)}
                    ></ha-input>`
                  : nothing}
              </div>
            `;
          })}
        </div>

        <div class="custom-row">
          <ha-input
            label="Add custom target"
            placeholder="notify.mobile_app_phone or script.notify_tv"
            .value=${this._custom}
            @input=${(e: Event) => (this._custom = (e.target as HTMLInputElement).value)}
            @keydown=${(e: KeyboardEvent) => {
              if (e.code === "Enter") {
                e.preventDefault();
                this._addCustom();
              }
            }}
          ></ha-input>
          <ha-button appearance="outlined" variant="brand" @click=${() => this._addCustom()}>
            Add
          </ha-button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [EDITOR_TAG]: MultiSelectNotifyCardEditor;
    [CARD_TAG]: import("./notify-card").MultiSelectNotifyCard;
  }
}
