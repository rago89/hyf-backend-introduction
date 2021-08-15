const express = require("express");
const channelRoutes = require("./routes/channels");
const messageRoutes = require("./routes/messages");

const router = express.Router();

router.use((req, res, next) => {
  console.log("api!");
  next();
});

router.get("/", (req, res) => {
  res.send("api!");
});

// use routes
router.use("/channels", channelRoutes);
router.use("/", messageRoutes);

module.exports = router;
