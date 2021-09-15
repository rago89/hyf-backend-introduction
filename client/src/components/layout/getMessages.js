export const getMessagesInnerHtml = (messages) => {
  return messages
    .map(
      (m) => `
    <div class="message">
      <a class="message_profile-pic" href=""></a>
      <a class="message_username" href="">${m.user}</a>
      <span class="message_timestamp">${m.date.toLocaleString()}</span>
      <span class="message_star"></span>
      <span class="message_content">
       ${m.text}
      </span>
    </div>
    `
    )
    .join("");
};
