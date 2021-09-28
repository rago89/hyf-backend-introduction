import { state } from "../../state/state.js";

import { fetchMessagesForChannel } from "../../api-calls/calls.js";

import { getMessagesInnerHtml } from "./getMessages.js";

export const registerUpdates = (messagesEl) => {
  setInterval(async () => {
    const messages = await fetchMessagesForChannel(state.currentChannelId);

    messagesEl.innerHTML = getMessagesInnerHtml(messages);
  }, 300);
};
