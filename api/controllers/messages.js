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
    try {
      const channelId = req.params.id;
      const message = req.body.text;
      const user = req.body.user;
      const newMessage = await messageManager.createMessage(
        user,
        message,
        channelId
      );
      res.status(200).send(JSON.stringify(newMessage));
    } catch (err) {
      res.status(500).send(err);
    }
  },
  delete: async (req, res) => {
    // deleted the message with the specified id
    // passed as /api/messages/:messageId
    // TODO implement
    res.send("Not yet implemented");
  },
};

module.exports = messageController;
