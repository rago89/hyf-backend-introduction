const express = require("express");
const channelController = require("../controllers/channels");
const tokenChecker = require("../middleware/tokenLogin");
const channelRoutes = express.Router();

// channelRoutes.use((req, res, next) => {
//   console.log("api!");
//   next();
// });

channelRoutes.use((req, res, next) => {
  tokenChecker(req, res, next);
});

channelRoutes.get("/", channelController.get);
channelRoutes.get("/:channelId", channelController.getChannelById);
channelRoutes.delete("/:channelId", channelController.delete);
channelRoutes.put("/:channelId", channelController.put);
channelRoutes.post("/", channelController.post);

module.exports = channelRoutes;
