import { CARD_TAG } from "./const";
import "./editor";
import "./notify-card";

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: CARD_TAG,
  name: "Multi-Notify Card",
  description:
    "Send a notification to one or more notify targets, with a visual editor.",
  preview: true,
});
