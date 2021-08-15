const objectId = require("objectid");

const persistentDataAccess = require("../data-access/persistent");

const messageStore = persistentDataAccess("messages");

const messageManager = {
  createMessage: async (user, messageContent, channelId) => {
    // TODO: implement
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
    // TODO: implement
  },
  getMessagesForChannel: async (channelId) => {
    // TODO: implement
  },
};

module.exports = messageManager;
