import { state } from "../state/state.js";
import {
  postChannel,
  postMessage,
  postUser,
  login,
} from "../api-calls/calls.js";

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

export const register = async (event) => {
  if (event.target.innerHTML === "Register") {
    getUserRegistration();
    const newUser = await postUser();
    if (newUser.user) {
      state.userId = newUser.user.id;
      state.password = undefined;
    }
    alert(newUser.message);
  } else if (event.target.innerHTML === "Login") {
    getUserLogin();
    const userLog = await login();
    if (userLog.user) {
      state.token = userLog.user.token;
      state.userId = userLog.user.id;
      state.password = undefined;
    }
    alert(userLog.message);
  }
};

function getUserRegistration() {
  state.username = prompt("Please enter username");
  state.password = prompt("please enter a password");
  state.email = prompt("please enter email");
}

function getUserLogin() {
  state.username = prompt("Please enter username or email");
  state.password = prompt("please enter a password");
}
