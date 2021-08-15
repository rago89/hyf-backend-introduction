import { state } from "../state/state.js";
import { postChannel, postMessage } from "../api-calls/calls.js";

export const channelClicked = (event) => {
  if (!event.target.dataset.channelId) {
    return;
  }
  state.currentChannelId = event.target.dataset.channelId;
  state.currentChannelName = event.target.dataset.channelName;
};

export const sendMessage = async () => {
  await postMessage(document.getElementById("chat-field").value);
  document.getElementById("chat-field").value = "";
};

export const addChannel = async (event) => {
  if (event.target.type === "submit") {
    const channelName = prompt("Please enter channel name:");
    await postChannel(channelName);
  }
};
