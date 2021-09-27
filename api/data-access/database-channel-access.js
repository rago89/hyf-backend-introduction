const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3").verbose();

const DB_PATH = path.join(__dirname, "..", "..", "data", "slack-clone.sqlite");

const db = open({ filename: DB_PATH, driver: sqlite3.Database });

const databaseAccess = {
  create: async (channelName) => {
    const database = await db;
    const queryString = `INSERT INTO Channel (name) VALUES('${channelName}')`;
    await database.all(queryString);
  },

  update: async (id = "", newChannelName = "") => {
    const database = await db;
    const queryIdString = `SELECT * FROM channel WHERE id = "${id}"`;
    const ids = await database.all(queryIdString);

    if (ids.length === 0) {
      throw new Error(`Cannot update channel, id doesn't exist`);
    }
    const queryUpdateString = `
    UPDATE channel
    SET name = "${newChannelName}" 
    WHERE id = ${id}`;
    const channel = await database.all(queryUpdateString);
    return channel;
  },

  remove: async (id) => {
    const database = await db;
    const queryIdString = `SELECT * FROM channel WHERE id = ${id}`;
    const ids = await database.all(queryIdString);

    if (ids.length === 0) {
      throw new Error(`Cannot delete channel, id doesn't exist`);
    }

    const queryStringToRemove = `DELETE FROM Channel WHERE id ='${id}'`;
    await database.all(queryStringToRemove);
  },

  read: async (id = "") => {
    const database = await db;
    const queryIdString = `SELECT * FROM channel WHERE id = "${id}"`;
    const ids = await database.all(queryIdString);

    if (ids.length === 0) {
      throw new Error(`Cannot get channel, id doesn't exist`);
    }
    const queryString = `SELECT * FROM channel WHERE id = '${id}'`;
    const channel = await database.all(queryString);
    return channel;
  },

  all: async () => {
    const database = await db;
    const queryString = `SELECT * FROM channel`;
    const channels = await database.all(queryString);
    return channels;
  },
};

module.exports = databaseAccess;
