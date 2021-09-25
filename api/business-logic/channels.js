const databaseAccess = require("../data-access/database-channel-access");

const channelManager = {
  createChannel: async (channelName) => {
    await databaseAccess.create(channelName);
  },
  updateChannel: async (channel) => {
    const success = await databaseAccess.update(channel.id, channel.name);
    if (!success) {
      throw new Error("Cannot update a channel that doesn't exist!");
    }
    return channel;
  },
  removeChannel: async (channelId) => {
    const removeChannel = await databaseAccess.remove(channelId);
    return removeChannel;
  },
  getChannel: async (channelId) => {
    return await databaseAccess.read(channelId);
  },
  getAllChannels: async () => {
    return await databaseAccess.all();
  },
};

module.exports = channelManager;
