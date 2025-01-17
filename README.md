# Multi-Notify Card for Lovelace/Home Assistant
Forked from https://github.com/bernikr/lovelace-notify-card.

[!["Buy bernikr A Coffee"](https://img.shields.io/static/v1?label=donate&message=buymeacoffe&color=FFDD00&logo=buymeacoffee&style=flat-square)](https://buymeacoffee.com/bernikr)
[!["Chat with bernikr on Telegram"](https://img.shields.io/static/v1?label=chat&message=Telegram&color=26A5E4&logo=telegram&style=flat-square)](https://t.me/bernikr)

This simple card allows you to notify any notification service manually from the dashboard.

![card](card.png)

## Manual HACS Installation Instructions
You must manually add this repository to HACS and install the component:

1. Open HACS in Home Assistant
2. Navigate to "Frontend" section
3. In the top right corner, click on the three dots and select "Custom repositories"
4. In the dialog that appears, paste the URL of this repository (https://github.com/imonlinux/lovelace-multiselect-notify-card) into the 'Repository' field
5. Select 'Frontend' as the category
6. Click 'Add'

Once installed, you can proceed with the configuration steps as outlined in this README.

## Install
### Install via HACS
1. Go to the "Frontend"-tab in HACS
2. Click on "Explore & Add Repositories"
3. Search for `Multi-Notify Card`
5. Click "Install this Repository in HACS"

### Manual install
1. Copy the `lovelace-multiselect-notify-card.js` file to your `config/www` folder
2. Add a reference in the resoruce config:

```
resources:
  - url: /local/lovelace-multiselect-notify-card.js
    type: module
```

## Config
Example config:

```
type: custom:lovelace-multiselect-notify-card
targets:
  - entity: mobile_app_james_phone
    label: James's Phone
  - entity: mobile_app_candice_phone
    label: Candice's Phone
  - entity: mobile_app_felicias_phone
    label: Felicia's Phone
  - entity: mobile_app_august_phone
    label: August's Phone
  - entity: lg_webos_tv_oled65c2aua
    label: Living Room TV
card_title: Selectable Notification Sender
label: Enter your message
notification_title: Alert from Home Assistant
```

- `targets` is the name of the notify-service that should get called without the `notify.` domain. (For `notify.notify` put in `notify`, for `notify.telegram` put in `telegram`, etc. If your service is not under the `notify.` domain, use the full service name, example: `script.notify_tv`)
- `label` is optional and controlls the placeholder text
- `card_title` is optional and controlles the card title
- `notification_title` is optional and is the title that gets sent with the notification

You can also specify multiple notification services like this:

```
type: 'custom:lovelace-multiselect-notify-card'
targets:
- living_room_tv
- notify
```

If you want a textfield to set the notification title with every message you can configure it like this:
```
type: 'custom:lovelace-multiselect-notify-card'
targets: living_room_tv
notification_title:
  input:
```

If you want to change the label of the title textfield you can do that in the input parameter:
```
type: 'custom:lovelace-multiselect-notify-card'
targets: living_room_tv
notification_ title:
  input: 'Put Title here'
```

If your notification service requires additional data (e.g. Alexa) you can include it like this:
```
type: 'custom:lovelace-multiselect-notify-card'
targets: alexa_media_living_room
data:
  type: announce
```

If your want to use `tts.google_translate_say`, include an entity like this:
```
type: 'custom:lovelace-multiselect-notify-card'
targets: tts.google_translate_say
entity: media_player.google_nest_mini
```

