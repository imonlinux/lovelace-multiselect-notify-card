# Multi-Notify Card for Home Assistant

Forked from [bernikr/lovelace-notify-card](https://github.com/bernikr/lovelace-notify-card).

[!["Buy bernikr A Coffee"](https://img.shields.io/static/v1?label=donate&message=buymeacoffe&color=FFDD00&logo=buymeacoffee&style=flat-square)](https://buymeacoffee.com/bernikr)
[!["Chat with bernikr on Telegram"](https://img.shields.io/static/v1?label=chat&message=Telegram&color=26A5E4&logo=telegram&style=flat-square)](https://t.me/bernikr)

Send a notification to one or more notify targets from a single dashboard card,
with a visual editor for picking targets.

## v2 — Home Assistant 2026.11 compatibility

v1 stopped rendering on Home Assistant 2026.11: the frontend removed its
Material Web Components dependency (`mwc-*`), which this card was built on.
v2 is a full rewrite on [Lit](https://lit.dev) against the current frontend
component set (`ha-card`, `ha-checkbox`, `ha-input`, `ha-textarea`,
`ha-button`) and adds a GUI editor. Config from v1 keeps working; see
[Migrating from v1](#migrating-from-v1).

Requires Home Assistant 2026.11 or later.

## Install

### HACS

1. Add this repository to HACS as a custom repository (Frontend category):
   `https://github.com/imonlinux/lovelace-multiselect-notify-card`
2. Install **Multi-Notify Card** from HACS.
3. Refresh the dashboard; Lovelace picks up `lovelace-multiselect-notify-card.js`
   automatically.

### Manual

1. Copy `dist/lovelace-multiselect-notify-card.js` to your `config/www` folder.
2. Add a resource:

```yaml
resources:
  - url: /local/lovelace-multiselect-notify-card.js
    type: module
```

## Using the card

Add the card from the card picker ("Multi-Notify Card") and pick targets in the
visual editor, or configure YAML directly:

```yaml
type: custom:lovelace-multiselect-notify-card
targets:
  - service: mobile_app_james_phone
    label: James's Phone
  - service: mobile_app_candice_phone
  - service: script.notify_tv
card_title: Send Notification
message_placeholder: Enter your message
notification_title: Alert from Home Assistant
```

### Targets

Each entry in `targets` is one of:

- A bare notify key: `mobile_app_james_phone` (shorthand for the service below).
- An object with `service` and an optional `label`:
  - `service: mobile_app_james_phone` — a notify entity
    (`notify.mobile_app_james_phone`). Sent via the modern
    `notify.send_message` action with the entity as target.
  - `service: script.notify_tv` — any full `domain.service` outside the
    `notify` domain, called directly. Useful for scripts and TTS:
    `service: tts.google_translate_say` with `entity:
    media_player.google_nest_mini`.
- Legacy form from v1 (`entity:` key) is accepted and normalized to
  `service:`.

Labels are optional. Without one, the card shows the entity's friendly name
(when the `notify.*` entity exists) or a humanized service key.

### Options

| Option | Description |
| --- | --- |
| `targets` | Target list (see above). Also accepts a single string or a plain array of strings. |
| `card_title` | Card header. Default: `Send Notification`. |
| `message_placeholder` | Placeholder for the message box. Default: `Enter your message`. |
| `notification_title` | Pre-filled title sent with the notification. Default: `Home Assistant Notification`. Leave empty for no title. |
| `data` | Extra service data passed through to every target (e.g. `type: announce` for Alexa). |

Checkboxes start unchecked; pick recipients per send. Sending with nothing
selected or an empty message does nothing. `Ctrl+Enter` in the message box
sends. If a target is unknown or its send fails, an inline error names the
failed targets.

### Visual editor

The card ships a GUI editor. It lists every available target from your
instance — `notify.*` entities plus registered notify services (legacy ones
badged), with the generic `notify.send_message` excluded — searchable by name
or key, with per-target label overrides and a custom field for anything else
(`notify.foo`, bare keys, or full `script.notify_tv`-style services).

## Migrating from v1

- `targets` entries using `entity:` keep working; new configs use `service:`.
- `notification_title: {input:}` (render a title text field) is retired; the
  card now always shows a title field pre-filled from `notification_title`.
  Set `notification_title: ""` to default it to empty.
- The legacy `label` option (message placeholder) still works; the editor
  writes it as `message_placeholder` and keeps both in sync.

## Development

```sh
bun install        # or npm install
bun run build      # esbuild -> dist/lovelace-multiselect-notify-card.js
bun run typecheck  # tsc --noEmit
bun run watch
```

Source lives in `src/`; `dist/` is committed (that is the file HACS serves).
