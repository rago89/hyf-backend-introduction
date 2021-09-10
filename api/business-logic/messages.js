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
    return await messageStore.update(message.id, message);
  },
  removeMessage: async (messageId) => {
    return await messageStore.remove(messageId);
  },
  getMessage: async (messageId) => {
    // TODO: implement
  },
  getAllMessages: async () => {
    return await messageStore.all();
  },
  getMessagesForChannel: async (channelId) => {
    const allMessages = await messageStore.all();
    const channelMessages = allMessages.filter(
      (bodyMessage) => bodyMessage.channelId === channelId
    );
    if (channelMessages.length === 0) {
      throw new Error("There are not messages with the specified channel");
    }

    return channelMessages;
  },
};

module.exports = messageManager;
