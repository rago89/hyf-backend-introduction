const objectId = require("objectid");

const persistentDataAccess = require("../data-access/persistent");

const messageStore = persistentDataAccess("messages");

const messageManager = {
  createMessage: async (user, messageContent, channelId) => {
    const message = {
      user: user,
      id: objectId().toString(),
      text: messageContent,
      channelId: channelId,
      date: new Date(),
    };
    await messageStore.create(message);
    return message;
  },
  updateMessage: async (message) => {
    // TODO: implement
  },
  removeMessage: async (messageId) => {
    // TODO: implement
  },
  getMessage: async (messageId) => {
    // TODO: implement
  },
  getAllMessages: async () => {
    messageStore.all();
  },
  getMessagesForChannel: async (channelId) => {
    // TODO: implement
  },
};

module.exports = messageManager;
