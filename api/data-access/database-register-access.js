/* eslint-disable array-callback-return */
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3").verbose();

const DB_PATH = path.join(__dirname, "..", "..", "data", "slack-clone.sqlite");

const db = open({ filename: DB_PATH, driver: sqlite3.Database });

const databaseAccess = {
  create: async (newUser) => {
    const database = await db;
    const queryString = `INSERT INTO user
      VALUES(NULL,'${newUser.userName}','${newUser.password}',"${newUser.email}","${newUser.date}")`;
    await database.run(queryString);

    const lastIdQueryString = `SELECT id,username,email,date from user WHERE email = '${newUser.email}'`;
    const user = await database.get(lastIdQueryString);
    return user;
  },

  update: async (id, newUser) => {
    const database = await db;
    const queryIdString = `SELECT * FROM user WHERE id = "${id}"`;
    const ids = await database.all(queryIdString);

    const matchId = ids.find((entry) => entry.id === Number(id));

    if (!matchId) {
      throw new Error(`Cannot update user, id doesn't exist`);
    }
    const queryUpdateString = `
    UPDATE user
    SET user = "${newUser}" 
    WHERE id = ${id}`;
    await database.all(queryUpdateString);
  },

  remove: async (id) => {
    const database = await db;
    const queryIdString = `SELECT * FROM user WHERE id = "${id}"`;
    const ids = await database.all(queryIdString);

    if (ids.length === 0) {
      throw new Error(`Cannot delete user, id doesn't exist`);
    }
    const queryStringToRemove = `DELETE FROM user WHERE id ='${id}'`;
    await database.all(queryStringToRemove);
  },

  read: async (id = "") => {
    const database = await db;
    const queryIdString = `SELECT id FROM user WHERE id = "${id}"`;
    const ids = await database.all(queryIdString);

    if (ids.length === 0) {
      throw new Error(`Cannot get user, 'Id' doesn't exist`);
    }
    const queryString = `SELECT id,username,email,date FROM user WHERE id = '${id}'`;
    const user = await database.all(queryString);
    return user;
  },

  readChannelUsers: async (userId = "", channelId = "") => {
    const database = await db;
    const queryIdString = `SELECT id FROM user WHERE id = '${userId}'`;
    const ids = await database.all(queryIdString);

    if (ids.length === 0) {
      throw new Error(`Cannot get users, channel doesn't exist`);
    }
    const queryString = `SELECT id,username,email,date FROM user WHERE channelId = '${channelId}'`;
    const user = await database.all(queryString);
    return user;
  },

  all: async () => {
    const database = await db;
    const queryString = `SELECT id,username,email,date FROM user`;
    const users = await database.all(queryString);
    return users;
  },

  findUserByEmail: async (email) => {
    const database = await db;
    const queryString = `SELECT email FROM user WHERE email = '${email}'`;
    const emails = await database.all(queryString);
    console.log(emails);

    if (emails.length !== 0) {
      throw new Error(
        `Cannot create user with the email: ${emails[0].email}, already exists`
      );
    }
  },

  findUserLog: async (userOrEmail, password) => {
    const database = await db;
    const queryString = `SELECT username,email,password,id FROM user`;
    const emails = await database.all(queryString);

    // eslint-disable-next-line consistent-return
    const userMatch = emails.find((entry) => {
      if (
        (userOrEmail === entry.username && password !== entry.password) ||
        (userOrEmail === entry.email && password !== entry.password)
      ) {
        throw new Error("Password Incorrect");
      }
      if (
        (userOrEmail === entry.username && password === entry.password) ||
        (userOrEmail === entry.email && password === entry.password)
      ) {
        return entry;
      }
    });

    return userMatch;
  },
};

module.exports = databaseAccess;
