const channelManager = require("../business-logic/channels");

const channelController = {
  get: async (req, res) => {
    try {
      const channels = await channelManager.getAllChannels();
      res.status(200).send(JSON.stringify(channels));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getChannelById: async (req, res) => {
    try {
      const { channelId } = req.params;
      const channel = await channelManager.getChannel(channelId);
      res.status(200).send(JSON.stringify(channel));
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  put: async (req, res) => {
    try {
      const { channelId } = req.params;
      console.log(channelId);

      const newData = req.body;
      console.log(newData.id);
      if (newData.id !== Number(channelId)) {
        throw Error("Cannot change channel ID after creation!");
      }
      await channelManager.updateChannel(newData);
      res.status(200).send(JSON.stringify(newData));
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  post: async (req, res) => {
    try {
      const { body } = req;
      await channelManager.createChannel(body.name);
      res
        .status(200)
        .send(
          JSON.stringify(
            `Your new channel: "${body.name}" was successfully created`
          )
        );
    } catch (error) {
      res.status(500).send(error);
    }
  },
  delete: async (req, res) => {
    try {
      const { channelId } = req.params;
      await channelManager.removeChannel(channelId);
      res.status(200).send(
        JSON.stringify({
          message: `Channel ${channelId} was successfully deleted!`,
        })
      );
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = channelController;
