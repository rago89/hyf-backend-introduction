const express = require("express");
const messageController = require("../controllers/messages");
// const tokenChecker = require("../middleware/tokenLogin");

// create sub-route
const messageRoutes = express.Router();

// get all messages
messageRoutes.get("/messages", messageController.getAll);
// get messages from an specific channel
messageRoutes.get(
  "/channels/:channelId/messages",
  messageController.getMessagesForChannel
);
// get a specific message
messageRoutes.get("/messages/:messageId", messageController.getMessage);
// delete a message
messageRoutes.delete("/messages/:messageId", messageController.delete);
// update a message
messageRoutes.patch("/messages/:messageId", messageController.patch);
// create a message
messageRoutes.post("/channels/:channelId/messages", messageController.post);

module.exports = messageRoutes;
