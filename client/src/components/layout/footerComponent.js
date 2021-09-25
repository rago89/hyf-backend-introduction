import { state } from "../../state/state.js";

export const footerComponent = () => {
  return `
    <div class="user-menu"><span class="user-menu_profile-pic"></span>
    <button id="btn-add-channel">
      Add channel
    </button>
    <span class="user-menu_username">${state.username}</span></div>
    <div class="input-box">
      <input id="chat-field" class="input-box_text" type="text"/>
    </div>
    `;
};
