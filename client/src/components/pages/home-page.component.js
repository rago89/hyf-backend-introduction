// components
import { getHeaderInnerHtml } from "../layout/getHeaderComponent.js";
import { footerComponent } from "../layout/footerComponent.js";
import { registerUpdates } from "../layout/registerUpdates.js";
// handlers
import {
  sendMessage,
  channelClicked,
  addChannel,
  register,
} from "../../handlers/handlers.js";

export const homePage = async () => {
  const el = document.createElement("div");
  el.style = "height:100%;";

  const headerEl = document.createElement("div");
  headerEl.classList.add("header");
  headerEl.innerHTML = getHeaderInnerHtml();
  el.appendChild(headerEl);

  const mainEl = document.createElement("div");
  mainEl.classList.add("main");

  const channelListingsEl = document.createElement("div");
  channelListingsEl.classList.add("listings");
  mainEl.appendChild(channelListingsEl);

  const messageHistoryEl = document.createElement("div");
  messageHistoryEl.classList.add("message-history");
  mainEl.appendChild(messageHistoryEl);

  el.appendChild(mainEl);

  const footerEl = document.createElement("div");
  footerEl.classList.add("footer");
  footerEl.innerHTML = footerComponent();

  el.appendChild(footerEl);

  registerUpdates(channelListingsEl, messageHistoryEl);

  // register event handlers:
  document.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      // alert("Enter is pressed!");
      sendMessage();
    }
  });

  channelListingsEl.addEventListener("click", channelClicked);
  footerEl.addEventListener("click", addChannel);

  // add handler to register and login button
  headerEl.addEventListener("click", register);

  return el;
};