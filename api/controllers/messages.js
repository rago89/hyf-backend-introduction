const messageManager = require("../business-logic/messages");

const messageController = {
  get: async (req, res) => {
    // returns all messages currently in the system
    const messages = messageManager.getAllMessages();
    // TODO implement
    res.send(JSON.stringify(messages));
  },
  getMessagesForChannel: async (req, res) => {
    // returns the messages that belong in the channel with the specified id
    // passed as /api/channels/:channelId/messages
    // TODO implement
    res.send(JSON.stringify([]));
  },
  put: async (req, res) => {
    // updates the messages with the specified id
    // passed as /api/messages/:messageId
    // TODO implement
    res.send("Not yet implemented");
  },
  post: async (req, res) => {
    // creates a new message based on the passed body
    const id = req.params.id;
    const body = req.body;
    const newMessage = messageManager.createMessage(body);
    // TODO implement
    res.send("message created");
  },
  delete: async (req, res) => {
    // deleted the message with the specified id
    // passed as /api/messages/:messageId
    // TODO implement
    res.send("Not yet implemented");
  },
};

module.exports = messageController;
