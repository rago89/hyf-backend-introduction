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
    return databaseAccess.read(messageId);
  },
  getChannelMessages: async (channelId) => {
    return databaseAccess.readChannelMessages(channelId);
  },
  getAllMessages: async () => {
    return databaseAccess.all();
  },
};

module.exports = messageManager;
