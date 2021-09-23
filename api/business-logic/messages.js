const databaseAccess = require("../data-access/database-message-access");

const messageManager = {
  createMessage: async (channelId, messageBody) => {
    await databaseAccess.create(channelId, messageBody);
  },
  updateMessage: async (newData = {}) => {
    await databaseAccess.update(newData.id, newData.message);
  },
  removeMessage: async (messageId) => {
    const removeMessage = await databaseAccess.remove(messageId);
    return removeMessage;
  },
  getMessage: async (messageId) => {
    return await databaseAccess.read(messageId);
  },
  getChannelMessages: async (channelId) => {
    return await databaseAccess.readChannelMessages(channelId);
  },
  getAllMessages: async () => {
    return await databaseAccess.all();
  },
};

module.exports = messageManager;
