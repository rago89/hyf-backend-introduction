const express = require("express");
const messageController = require("../controllers/messages");
// create sub-route
const messageRoutes = express.Router();
// test the route using a middleware
messageRoutes.use((req, res, next) => {
  console.log("api!");
  next();
});
// get all messages
messageRoutes.get("/messages", messageController.get);
// get an specific message
messageRoutes.get(
  "/channels/:channelId/messages",
  messageController.getMessagesForChannel
);
// delete a message
messageRoutes.delete("/messages/:messageId", messageController.delete);
// update a message
messageRoutes.put("/messages/:messageId", messageController.put);
// create a message
messageRoutes.post("/channels/:channelId/messages", messageController.post);

module.exports = messageRoutes;
