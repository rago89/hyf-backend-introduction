"use strict";
const fs = require("fs");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3").verbose();

const DB_PATH = path.join(__dirname, "..", "..", "data", "slack-clone.sqlite");

if (!fs.existsSync(DB_PATH)) {
  console.log("hu");
  const db = new sqlite3.Database(DB_PATH);
}

const db = open({ filename: DB_PATH, driver: sqlite3.Database });

const databaseAccess = {
  create: async (newUser) => {
    const database = await db;
    const queryString = `INSERT INTO user
      VALUES(NULL,'${newUser.userName}','${newUser.password}',"${newUser.email}","${newUser.date}")`;
    await database.all(queryString);

    const lastIdQueryString = `SELECT id,username,email,date from user WHERE email = '${newUser.email}' order by id DESC limit 1`;
    const userId = await database.all(lastIdQueryString);
    return userId;
  },

  update: async (id, newUser) => {
    const database = await db;
    const queryIdString = `SELECT * FROM user`;
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
    const queryIdString = `SELECT * FROM user`;
    const ids = await database.all(queryIdString);

    const matchId = ids.find((entry) => entry.id === Number(id));
    if (!matchId) {
      throw new Error(`Cannot delete user, id doesn't exist`);
    }
    const queryStringToRemove = `DELETE FROM user WHERE id ='${id}'`;
    await database.all(queryStringToRemove);
  },

  read: async (id = "") => {
    const database = await db;
    const queryIdString = `SELECT * FROM user`;
    const ids = await database.all(queryIdString);

    const matchId = ids.find((entry) => entry.id === Number(id));
    if (!matchId) {
      throw new Error(`Cannot get users, channel doesn't exist`);
    }
    const queryString = `SELECT * FROM user WHERE id = '${id}'`;
    const user = await database.all(queryString);
    return user;
  },

  readChannelUsers: async (id = "") => {
    const database = await db;
    const queryIdString = `SELECT * FROM user WHERE id = '${id}'`;
    const ids = await database.all(queryIdString);

    const matchId = ids.find((entry) => entry.id === Number(id));
    if (!matchId) {
      throw new Error(`Cannot get user, id doesn't exist`);
    }
    const queryString = `SELECT * FROM user WHERE channelId = '${id}'`;
    const user = await database.all(queryString);
    return user;
  },

  all: async () => {
    const database = await db;
    const queryString = `SELECT * FROM user`;
    const users = await database.all(queryString);
    return users;
  },

  findUserByEmail: async (email) => {
    const database = await db;
    const queryString = `SELECT email FROM user`;
    const emails = await database.all(queryString);
    const matchEmail = emails.find((entry) => entry.email === email);
    if (matchEmail) {
      throw new Error(
        `Cannot create user with the email: ${matchEmail.email}, already exists`
      );
    }
    return matchEmail;
  },

  findUserLog: async (userOrEmail, password) => {
    const database = await db;
    const queryString = `SELECT username,email,password,id FROM user`;
    const emails = await database.all(queryString);
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
