import { state } from "../../state/state.js";

import {
  fetchChannels,
  fetchMessagesForChannel,
} from "../../api-calls/calls.js";

import { getChannelListInnerHtml } from "./channelList.js";
import { getMessagesInnerHtml } from "./getMessages.js";

export const registerUpdates = (channelListEl, messagesEl) => {
  setInterval(async () => {
    const headerChannelName = document.getElementById("channelHeaderName");
    headerChannelName.innerHTML = state.currentChannelName;
    const messages = await fetchMessagesForChannel(state.currentChannelId);
    const channels = await fetchChannels();
    channelListEl.innerHTML = getChannelListInnerHtml(channels);
    messagesEl.innerHTML = getMessagesInnerHtml(messages);
  }, 300);
};
