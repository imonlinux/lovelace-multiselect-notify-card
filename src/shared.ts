import { GENERIC_SEND_MESSAGE } from "./const";
import type { HomeAssistant } from "./types";

export interface CardTarget {
  /** Bare notify key ("mobile_app_james_phone") or full "domain.service". */
  service: string;
  /** Display override; empty means infer from the entity or humanize the key. */
  label: string;
}

export interface CardConfig {
  targets: CardTarget[];
  card_title?: string;
  notification_title?: string;
  message_placeholder?: string;
  /** Legacy alias of message_placeholder, kept in sync by the editor. */
  label?: string;
  /** Extra service data passed as data.data. */
  data?: Record<string, unknown>;
  /** entity_id merged into service data for full-service targets. */
  entity?: string;
}

/**
 * Normalize every documented v1 target shape into {service, label} entries.
 * Accepts: string, array of strings, array of {entity|service, label}, single object.
 */
export function normalizeTargets(targets: unknown): CardTarget[] {
  if (!targets) return [];

  const fromObject = (obj: Record<string, unknown>): CardTarget | null => {
    const service = obj.service ?? obj.entity;
    if (typeof service !== "string" || !service.trim()) return null;
    const label = typeof obj.label === "string" ? obj.label : "";
    return { service: service.trim(), label };
  };

  if (typeof targets === "string") {
    return targets.trim() ? [{ service: targets.trim(), label: "" }] : [];
  }

  if (Array.isArray(targets)) {
    return targets.flatMap((entry) => {
      if (typeof entry === "string") {
        return entry.trim() ? [{ service: entry.trim(), label: "" }] : [];
      }
      if (entry && typeof entry === "object") {
        const t = fromObject(entry as Record<string, unknown>);
        return t ? [t] : [];
      }
      return [];
    });
  }

  if (typeof targets === "object") {
    const t = fromObject(targets as Record<string, unknown>);
    return t ? [t] : [];
  }

  return [];
}

export interface ParsedService {
  domain: string;
  service: string;
}

/** "script.notify_tv" -> {domain: "script", service: "notify_tv"}; bare -> notify domain. */
export function parseService(service: string): ParsedService | null {
  const s = (service ?? "").trim();
  if (!s) return null;
  if (s.includes(".")) {
    const [domain, name] = s.split(".", 2);
    if (!domain || !name) return null;
    return { domain, service: name };
  }
  return { domain: "notify", service: s };
}

/** "mobile_app_james_phone" -> "James Phone". */
export function humanizeKey(key: string): string {
  if (!key) return "";
  let s = key;
  if (s.startsWith("mobile_app_")) s = s.slice("mobile_app_".length);
  return s
    .replace(/[._]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Best display name for a target: entity friendly name, else humanized key. */
export function targetDisplayName(
  hass: HomeAssistant | undefined,
  target: CardTarget,
): string {
  if (target.label && target.label.trim()) return target.label.trim();
  const parsed = parseService(target.service);
  if (!parsed) return target.service;
  if (parsed.domain === "notify") {
    const stateObj = hass?.states?.[`notify.${parsed.service}`];
    const friendly = stateObj?.attributes?.friendly_name;
    if (typeof friendly === "string" && friendly.trim()) return friendly.trim();
    return humanizeKey(parsed.service) || target.service;
  }
  return humanizeKey(target.service) || target.service;
}

export interface SendPayload {
  message: string;
  title: string;
  data?: Record<string, unknown>;
  entity?: string;
}

export interface SendOutcome {
  service: string;
  ok: boolean;
  error?: string;
}

/**
 * Send one notification to one target.
 *
 * - Full service ("script.notify_tv"): called directly; `entity` config is merged
 *   into service data as entity_id.
 * - Bare notify key: prefers the notify entity via notify.send_message targeting,
 *   falls back to the legacy per-target service when no entity exists.
 *
 * Throws synchronously for unknown targets; returns the call promise so callers can
 * await delivery results.
 */
export function sendToTarget(
  hass: HomeAssistant,
  service: string,
  payload: SendPayload,
): { promise?: Promise<unknown>; error?: string } {
  const parsed = parseService(service);
  if (!parsed) return { error: `Invalid target service: ${service}` };

  const serviceData: Record<string, unknown> = { message: payload.message };
  if (payload.title) serviceData.title = payload.title;
  if (payload.data && Object.keys(payload.data).length > 0) {
    serviceData.data = payload.data;
  }

  if (parsed.domain !== "notify") {
    if (payload.entity) serviceData.entity_id = payload.entity;
    return { promise: hass.callService(parsed.domain, parsed.service, serviceData) };
  }

  const entityId = `notify.${parsed.service}`;
  if (hass.states?.[entityId]) {
    return {
      promise: hass.callService("notify", GENERIC_SEND_MESSAGE, serviceData, {
        entity_id: entityId,
      }),
    };
  }
  if (hass.services?.notify?.[parsed.service]) {
    return { promise: hass.callService("notify", parsed.service, serviceData) };
  }
  return { error: `Unknown notification target: ${entityId}` };
}

export function fireEvent(target: EventTarget, type: string, detail?: unknown): void {
  target.dispatchEvent(
    new CustomEvent(type, {
      detail,
      bubbles: true,
      composed: true,
    }),
  );
}
