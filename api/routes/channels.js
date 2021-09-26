const express = require("express");
const channelController = require("../controllers/channels");
const tokenChecker = require("../middleware/token-login");

const channelRoutes = express.Router();

channelRoutes.get("/", channelController.get);
channelRoutes.get("/:channelId", channelController.getChannelById);

channelRoutes.use((req, res, next) => {
  tokenChecker(req, res, next);
});

channelRoutes.delete("/:channelId", channelController.delete);
channelRoutes.put("/:channelId", channelController.put);
channelRoutes.post("/", channelController.post);

module.exports = channelRoutes;
