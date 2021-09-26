const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3").verbose();

const DB_PATH = path.join(__dirname, "..", "..", "data", "slack-clone.sqlite");

const db = open({ filename: DB_PATH, driver: sqlite3.Database });

const databaseAccess = {
  create: async (channelId, messageBody) => {
    const database = await db;
    const queryUserString = `SELECT username FROM user WHERE id = ${messageBody.userId}`;
    const usernameQuery = await database.all(queryUserString);
    if (usernameQuery) {
      console.log(usernameQuery);
    }
    const queryString = `INSERT INTO message 
    VALUES(NULL,"${messageBody.message}",${messageBody.userId},${channelId},"${messageBody.date}","${usernameQuery[0].username}")`;
    await database.all(queryString);
  },

  update: async (id, newData) => {
    const database = await db;
    const queryIdString = `SELECT * FROM message`;
    const ids = await database.all(queryIdString);

    const matchId = ids.find((entry) => entry.id === Number(newData.id));
    console.log(newData.id);
    if (!matchId) {
      throw new Error(`Cannot update message, id doesn't exist`);
    }
    const queryUpdateString = `
    UPDATE message
    SET message = "${newData.message}" 
    WHERE id = ${id}`;
    await database.all(queryUpdateString);
  },

  remove: async (id) => {
    const database = await db;
    const queryIdString = `SELECT * FROM message`;
    const ids = await database.all(queryIdString);

    const matchId = ids.find((entry) => entry.id === Number(id));
    if (!matchId) {
      throw new Error(`Cannot delete message, id doesn't exist`);
    }
    const queryStringToRemove = `DELETE FROM message WHERE id ="${id}"`;
    await database.all(queryStringToRemove);
  },

  read: async (id = "") => {
    const database = await db;
    const queryIdString = `SELECT * FROM message`;
    const ids = await database.all(queryIdString);

    const matchId = ids.find((entry) => entry.id === Number(id));
    if (!matchId) {
      throw new Error(`Cannot get messages, channel doesn't exist`);
    }
    const queryString = `SELECT * FROM message WHERE id = "${id}"`;
    const message = await database.all(queryString);
    return message;
  },

  readChannelMessages: async (id = "") => {
    const database = await db;
    const queryIdString = `SELECT * FROM channel WHERE id = "${id}"`;
    const ids = await database.all(queryIdString);

    const matchId = ids.find((entry) => entry.id === Number(id));
    if (!matchId) {
      throw new Error(`Cannot get message, id doesn't exist`);
    }
    const queryString = `SELECT * FROM message WHERE channelId = "${id}"`;
    const message = await database.all(queryString);
    return message;
  },

  all: async () => {
    const database = await db;
    const queryString = `SELECT * FROM message`;
    const messages = await database.all(queryString);
    return messages;
  },
};

module.exports = databaseAccess;
