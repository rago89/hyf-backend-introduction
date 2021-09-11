import { state } from "../state/state.js";
import { postChannel, postMessage, postUser } from "../api-calls/calls.js";

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
    await postUser();
  }
};

export const login = async (event) => {
  if (event.target.innerHTML === "Login") {
    getUserLogin();
    const userLog = await login();
    const userLogParsed = JSON.parse(userLog);
    state.token = userLogParsed.user.token;
    // const sessionId =  await
    console.log(state.token);
  }
};

function getUserRegistration() {
  state.username = prompt("Please enter username");
  state.password = prompt("please enter a password");
  state.email = prompt("please enter email");
}

async function getUserLogin() {
  state.username = prompt("Please enter username or email");
  state.password = prompt("please enter a password");
}
