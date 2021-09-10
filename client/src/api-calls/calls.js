import { state } from "../state/state.js";

async function performFetch(path) {
  const URL = `${window.location.origin}/api/${path}`;

  const encodedURL = encodeURI(URL);
  const response = await fetch(encodedURL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}\n-> ${URL}`);
  }
  const data = await response.json();

  return data;
}

async function performPost(path, body) {
  const URL = `${window.location.origin}/api/${path}`;

  const encodedURL = encodeURI(URL);
  const response = await fetch(encodedURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}\n-> ${URL}`);
  }
  const data = await response.json();

  return data;
}

export const fetchChannels = async () => {
  return await performFetch("channels");
};

export const fetchMessagesForChannel = async (channelId) => {
  if (!channelId) {
    return [];
  }
  return await performFetch(`channels/${channelId}/messages`);
};

export const postChannel = async (channelName) => {
  return await performPost("channels", { name: channelName });
};

export const postMessage = async (message) => {
  return await performPost(`channels/${state.currentChannelId}/messages`, {
    user: state.username,
    message: message,
  });
};
