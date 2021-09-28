const messageManager = require("../business-logic/messages");

const messageController = {
  getAll: async (req, res) => {
    try {
      const messages = await messageManager.getAllMessages();
      res.send(JSON.stringify(messages));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getMessagesForChannel: async (req, res) => {
    try {
      const { channelId } = req.params;
      const messages = await messageManager.getChannelMessages(channelId);
      res.send(JSON.stringify(messages));
    } catch (error) {
      res.status(400).send(`${error.name}: ${error.message}`);
    }
  },
  getMessage: async (req, res) => {
    try {
      const { messageId } = req.params;
      const messages = await messageManager.getMessage(messageId);
      res.send(JSON.stringify(messages));
    } catch (error) {
      res.status(400).send(`${error.name}: ${error.message}`);
    }
  },
  patch: async (req, res) => {
    try {
      const { messageId } = req.params;
      const newData = req.body;
      if (!newData.id) {
        throw Error("Missing the id in the body of the message!");
      }
      if (newData.message === "undefined" || newData.message === "") {
        throw Error("Content to update is empty!");
      }
      if (newData.id !== messageId) {
        throw Error("Cannot change channel ID after creation!");
      }
      await messageManager.updateMessage(newData);
      res.status(200).send(`Message updated successfully`);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  post: async (req, res) => {
    try {
      const { channelId } = req.params;
      const { body } = req;
      await messageManager.createMessage(channelId, body);
      res.status(200).json({ message: "message sent successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  delete: async (req, res) => {
    try {
      const { messageId } = req.params;
      await messageManager.removeMessage(messageId);
      res.status(200).send(
        JSON.stringify({
          message: `Message with id ${messageId} was successfully deleted!`,
        })
      );
    } catch (error) {
      res.status(400).send(`${error.message}`);
    }
  },
};

module.exports = messageController;
