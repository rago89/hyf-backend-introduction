const { restart } = require("nodemon");
const messageManager = require("../business-logic/messages");

const messageController = {
  get: async (req, res) => {
    try {
      const messages = await messageManager.getAllMessages();
      res.send(JSON.stringify(messages));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getMessagesForChannel: async (req, res) => {
    try {
      const channelId = req.params.channelId;
      const messages = await messageManager.getMessagesForChannel(channelId);
      res.send(JSON.stringify(messages));
    } catch (error) {
      res.status(400).send(error.name + ": " + error.message);
    }
  },
  put: async (req, res) => {
    try {
      const body = req.body;
      const modifyMessage = await messageManager.updateMessage(body);
      res.status(200).send(modifyMessage);
      if (newData.id !== messageId) {
        throw Error("Cannot change channel ID after creation!");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
  post: async (req, res) => {
    try {
      const channelId = req.params.channelId;
      const message = req.body.message;
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
    try {
      const messageId = req.params.messageId;
      await messageManager.removeMessage(messageId);
      res.status(200).send(
        JSON.stringify({
          message: `Message with id ${messageId} was successfully deleted!`,
        })
      );
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = messageController;
