import { state } from "../../state/state.js";

export const getHeaderInnerHtml = () => {
  if (!state.currentChannelName) {
    state.currentChannelName = "Please select a channel";
  }
  return `
  <div class="team-menu">Team Awesome</div>
  <div class="channel-menu"><span id="channelHeaderName" class="channel-menu_name"><span class="channel-menu_prefix">#</span>${state.currentChannelName}</span></div>
  <button id="btn-add-channel" class="buttonsLog">Register</button> <button id="btn-add-channel" class="buttonsLog">Login</button> `;
};
