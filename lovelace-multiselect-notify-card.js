/* lovelace-multiselect-notify-card.js
 *
 * Multi-Notify Card with GUI editor
 *
 * - Card: custom:lovelace-multiselect-notify-card
 * - Editor: provided via static getConfigElement()
 *
 * Backwards compatible with prior config:
 *   targets:
 *     - entity: mobile_app_phone
 *       label: Phone
 *
 * New preferred format:
 *   targets:
 *     - service: mobile_app_phone        # notify.<service>
 *       label: Phone
 *   # or full service:
 *     - service: script.notify_tv        # domain.service
 */

(() => {
  // ---- HA/Lit bootstrapping (no external imports) ----
  const getHaLit = () => {
    // Common pattern used by many custom cards: HA already bundles Lit, but doesn't expose it as an import.
    // We extract the base class + template helpers from an existing HA element.
    const base =
      customElements.get("ha-panel-lovelace") ||
      customElements.get("hui-view") ||
      customElements.get("home-assistant");

    if (!base) return null;

    const LitElement = Object.getPrototypeOf(base);
    const html = LitElement.prototype.html;
    const css = LitElement.prototype.css;
    return { LitElement, html, css };
  };

  const lit = getHaLit();
  if (!lit) {
    // If HA hasn't defined core elements yet, defer registration.
    console.warn("[multiselect-notify-card] HA base elements not ready; card may load later.");
  }
  const LitElement = lit?.LitElement ?? HTMLElement;
  const html = lit?.html ?? ((strings, ...vals) => strings.reduce((a, s, i) => a + s + (vals[i] ?? ""), ""));
  const css = lit?.css ?? (() => "");

  // ---- Helpers ----
  const fireEvent = (node, type, detail, options = {}) => {
    const event = new CustomEvent(type, {
      detail,
      bubbles: options.bubbles ?? true,
      composed: options.composed ?? true,
    });
    node.dispatchEvent(event);
  };

  const normalizeTargets = (targets) => {
    if (!targets) return [];
    if (Array.isArray(targets)) {
      return targets
        .map((t) => {
          if (typeof t === "string") {
            return { service: t, label: "" };
          }
          if (t && typeof t === "object") {
            // Back-compat: entity -> service
            const service = t.service ?? t.entity ?? "";
            const label = t.label ?? "";
            return { service, label };
          }
          return null;
        })
        .filter((t) => t && t.service);
    }
    // If someone used a single string/object by mistake, try to coerce.
    if (typeof targets === "string") return [{ service: targets, label: "" }];
    if (typeof targets === "object") {
      const service = targets.service ?? targets.entity ?? "";
      if (!service) return [];
      return [{ service, label: targets.label ?? "" }];
    }
    return [];
  };

  const isFullService = (svc) => typeof svc === "string" && svc.includes(".");
  const parseService = (svc) => {
    // Returns {domain, service}
    if (!svc) return null;
    if (isFullService(svc)) {
      const [domain, service] = svc.split(".", 2);
      if (!domain || !service) return null;
      return { domain, service };
    }
    // default notify domain
    return { domain: "notify", service: svc };
  };

  // ---- Card ----
  class LovelaceMultiSelectNotifyCard extends LitElement {
    static get properties() {
      return {
        hass: {},
        _config: { state: true },
        _message: { state: true },
        _title: { state: true },
        _selected: { state: true }, // Set of services
      };
    }

    static getConfigElement() {
      return document.createElement("lovelace-multiselect-notify-card-editor");
    }

    static getStubConfig() {
      return {
        card_title: "Send Notification",
        label: "Notification Text",
        notification_title: "Home Assistant Notification",
        targets: [],
      };
    }

    static get styles() {
      return css`
        ha-card {
          padding: 16px;
        }

        .wrap {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .targets {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .target-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .target-label {
          font-size: 1.05em;
        }

        ha-textfield,
        ha-textarea {
          width: 100%;
        }

        .actions {
          display: flex;
          justify-content: flex-end;
        }

        mwc-button {
          --mdc-theme-primary: var(--primary-color);
        }
      `;
    }

    setConfig(config) {
      const targets = normalizeTargets(config?.targets);
      if (!targets || targets.length === 0) {
        // Allow empty targets so user can add card and configure via GUI editor.
        // But keep a warning-like error for YAML users who expect it to work immediately.
        console.warn("[multiselect-notify-card] No targets configured yet.");
      }

      this._config = {
        card_title: "Send Notification",
        label: "Notification Text",
        notification_title: "Home Assistant Notification",
        ...config,
        targets,
      };

      // Initialize fields
      this._title = this._config.notification_title ?? "Home Assistant Notification";
      this._message = "";

      // Selection state
      const set = new Set((this._config.targets ?? []).map((t) => t.service).filter(Boolean));
      this._selected = set;
    }

    getCardSize() {
      const count = this._config?.targets?.length ?? 0;
      return Math.max(3, 2 + count);
    }

    _onToggleTarget(ev) {
      const svc = ev?.currentTarget?.dataset?.service;
      if (!svc) return;

      const next = new Set(this._selected ?? []);
      if (next.has(svc)) next.delete(svc);
      else next.add(svc);
      this._selected = next;
    }

    _onTitleInput(ev) {
      this._title = ev?.target?.value ?? "";
    }

    _onMessageInput(ev) {
      this._message = ev?.target?.value ?? "";
    }

    _onMessageKeydown(ev) {
      // Ctrl+Enter to send
      if (ev.code === "Enter" && ev.ctrlKey) {
        ev.preventDefault();
        this._send();
      }
    }

    _send() {
      const hass = this.hass;
      if (!hass) return;

      const msg = (this._message ?? "").trim();
      const title = (this._title ?? "").trim();

      if (!msg) return;

      const selected = Array.from(this._selected ?? []);
      if (selected.length === 0) return;

      selected.forEach((svc) => {
        const parsed = parseService(svc);
        if (!parsed) return;

        hass.callService(parsed.domain, parsed.service, {
          message: msg,
          title: title || undefined,
          ...(this._config.data ?? {}),
          ...(this._config.entity ? { entity_id: this._config.entity } : {}),
        });
      });

      this._message = "";
    }

    render() {
      if (!this._config) return html``;

      const header = this._config.card_title ?? "Send Notification";
      const placeholder = this._config.label ?? "Notification Text";
      const targets = this._config.targets ?? [];

      return html`
        <ha-card .header=${header}>
          <div class="wrap">
            <div class="targets">
              ${targets.length === 0
                ? html`<div>
                    No targets configured yet. Edit the card to pick available notify services.
                  </div>`
                : targets.map((t) => {
                    const svc = t.service;
                    const label = t.label || svc;
                    const checked = (this._selected ?? new Set()).has(svc);
                    return html`
                      <div class="target-row">
                        <ha-checkbox
                          .checked=${checked}
                          data-service=${svc}
                          @change=${this._onToggleTarget}
                        ></ha-checkbox>
                        <div class="target-label">${label}</div>
                      </div>
                    `;
                  })}
            </div>

            <div>
              <ha-textfield
                label="Notification Title"
                .value=${this._title ?? ""}
                @input=${this._onTitleInput}
              ></ha-textfield>
            </div>

            <div>
              <ha-textarea
                label=${placeholder}
                .value=${this._message ?? ""}
                @input=${this._onMessageInput}
                @keydown=${this._onMessageKeydown}
              ></ha-textarea>
            </div>

            <div class="actions">
              <mwc-button raised @click=${this._send}>Send</mwc-button>
            </div>
          </div>
        </ha-card>
      `;
    }
  }

  // ---- Editor ----
  class LovelaceMultiSelectNotifyCardEditor extends LitElement {
    static get properties() {
      return {
        hass: {},
        _config: { state: true },
        _filter: { state: true },
        _customService: { state: true },
      };
    }

    static get styles() {
      return css`
        .wrap {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 8px 0;
        }

        ha-textfield {
          width: 100%;
        }

        .section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .svc {
          font-family: var(--code-font-family, monospace);
          font-size: 0.95em;
          opacity: 0.9;
        }

        .grow {
          flex: 1;
        }

        .svc-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border: 1px solid var(--divider-color);
          border-radius: 8px;
          padding: 10px;
          max-height: 260px;
          overflow: auto;
        }

        .svc-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .label-input {
          min-width: 220px;
        }

        .hint {
          opacity: 0.75;
          font-size: 0.9em;
          line-height: 1.2em;
        }

        mwc-button {
          --mdc-theme-primary: var(--primary-color);
        }
      `;
    }

    setConfig(config) {
      this._config = {
        card_title: "Send Notification",
        label: "Notification Text",
        notification_title: "Home Assistant Notification",
        ...config,
        targets: normalizeTargets(config?.targets),
      };
      this._filter = "";
      this._customService = "";
    }

    _emitConfigChanged(newConfig) {
      this._config = newConfig;
      // HA expects config-changed events for editor changes. :contentReference[oaicite:3]{index=3}
      fireEvent(this, "config-changed", { config: newConfig });
    }

    _updateField(field, value) {
      const next = { ...this._config, [field]: value };
      this._emitConfigChanged(next);
    }

    _notifyServices() {
      const services = this.hass?.services?.notify ? Object.keys(this.hass.services.notify) : [];
      services.sort((a, b) => a.localeCompare(b));
      return services;
    }

    _selectedSet() {
      return new Set((this._config?.targets ?? []).map((t) => t.service));
    }

    _toggleNotifyService(service) {
      const targets = [...(this._config.targets ?? [])];
      const idx = targets.findIndex((t) => t.service === service);

      if (idx >= 0) {
        targets.splice(idx, 1);
      } else {
        targets.push({ service, label: "" });
      }

      this._emitConfigChanged({ ...this._config, targets });
    }

    _setTargetLabel(service, label) {
      const targets = [...(this._config.targets ?? [])];
      const idx = targets.findIndex((t) => t.service === service);
      if (idx < 0) return;
      targets[idx] = { ...targets[idx], label };
      this._emitConfigChanged({ ...this._config, targets });
    }

    _onAddCustom() {
      const raw = (this._customService ?? "").trim();
      if (!raw) return;

      // Accept "notify.foo" or "foo" or "script.notify_tv"
      let svc = raw;
      if (raw.startsWith("notify.")) svc = raw.slice("notify.".length);

      // For notify domain we store just the service part, for other domains store full domain.service
      const parsed = parseService(svc);
      if (!parsed) return;

      const stored = parsed.domain === "notify" ? parsed.service : `${parsed.domain}.${parsed.service}`;

      const targets = [...(this._config.targets ?? [])];
      if (!targets.some((t) => t.service === stored)) {
        targets.push({ service: stored, label: "" });
        this._emitConfigChanged({ ...this._config, targets });
      }

      this._customService = "";
    }

    render() {
      if (!this.hass || !this._config) return html``;

      const notifyServices = this._notifyServices();
      const selected = this._selectedSet();

      const filter = (this._filter ?? "").trim().toLowerCase();
      const filtered = filter
        ? notifyServices.filter((s) => s.toLowerCase().includes(filter))
        : notifyServices;

      return html`
        <div class="wrap">
          <div class="section">
            <ha-textfield
              label="Card Title"
              .value=${this._config.card_title ?? ""}
              @input=${(e) => this._updateField("card_title", e.target.value)}
            ></ha-textfield>

            <ha-textfield
              label="Message Placeholder"
              .value=${this._config.label ?? ""}
              @input=${(e) => this._updateField("label", e.target.value)}
            ></ha-textfield>

            <ha-textfield
              label="Default Notification Title"
              .value=${this._config.notification_title ?? ""}
              @input=${(e) => this._updateField("notification_title", e.target.value)}
            ></ha-textfield>
          </div>

          <div class="section">
            <div class="hint">
              Select which <span class="svc">notify.*</span> services should be available on the card.
              These are discovered from <span class="svc">hass.services.notify</span>.
              You can also add a custom full service (e.g. <span class="svc">script.notify_tv</span>).
            </div>

            <ha-textfield
              label="Filter notify services"
              .value=${this._filter ?? ""}
              @input=${(e) => (this._filter = e.target.value)}
            ></ha-textfield>

            <div class="svc-list">
              ${filtered.length === 0
                ? html`<div class="hint">No notify services found (or filtered out).</div>`
                : filtered.map((svc) => {
                    const checked = selected.has(svc);
                    const currentLabel =
                      (this._config.targets ?? []).find((t) => t.service === svc)?.label ?? "";
                    return html`
                      <div class="svc-item">
                        <ha-checkbox
                          .checked=${checked}
                          @change=${() => this._toggleNotifyService(svc)}
                        ></ha-checkbox>
                        <div class="grow">
                          <div class="svc">${svc}</div>
                        </div>
                        ${checked
                          ? html`
                              <ha-textfield
                                class="label-input"
                                label="Label (optional)"
                                .value=${currentLabel}
                                @input=${(e) => this._setTargetLabel(svc, e.target.value)}
                              ></ha-textfield>
                            `
                          : html``}
                      </div>
                    `;
                  })}
            </div>
          </div>

          <div class="section">
            <div class="row">
              <ha-textfield
                class="grow"
                label="Add custom service (optional)"
                placeholder="notify.mobile_app_phone OR script.notify_tv"
                .value=${this._customService ?? ""}
                @input=${(e) => (this._customService = e.target.value)}
              ></ha-textfield>
              <mwc-button raised @click=${this._onAddCustom}>Add</mwc-button>
            </div>
          </div>
        </div>
      `;
    }
  }

  // Register elements
  customElements.define("lovelace-multiselect-notify-card", LovelaceMultiSelectNotifyCard);
  customElements.define("lovelace-multiselect-notify-card-editor", LovelaceMultiSelectNotifyCardEditor);

  // Card picker metadata (nice-to-have)
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "lovelace-multiselect-notify-card",
    name: "Multi-Notify Card",
    description: "Send a notification to one or more notify services with a GUI editor.",
  });
})();
