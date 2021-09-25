import { state } from "../../state/state.js";

export const getChannelListInnerHtml = (channels) => {
  const channelEntriesHtml = channels
    .map((c) => {
      if (state.currentChannelId === c.id) {
        return `<li data-channel-id="${c.id}" data-channel-name="${c.name}" class="channel active"><a data-channel-id="${c.id}" data-channel-name="${c.name}" class="channel_name">
        <span data-channel-id="${c.id}" data-channel-name="${c.name}"><span data-channel-id="${c.id}" data-channel-name="${c.name}" class="prefix">#</span>${c.name}</span></a></li>`;
      } else {
        return `<li data-channel-id="${c.id}" data-channel-name="${c.name}" class="channel"><a data-channel-id="${c.id}" data-channel-name="${c.name}" class="channel_name">
        <span data-channel-id="${c.id}" data-channel-name="${c.name}"><span data-channel-id="${c.id}" data-channel-name="${c.name}" class="prefix">#</span>${c.name}</span></a></li>`;
      }
    })
    .join("");

  return `
    <div class="listings_channels">
      <h2 class="listings_header">Channels</h2>
      <ul class="channel_list">
        ${channelEntriesHtml}
      </ul>
    </div>
        `;
};
