"use strict";

const fs = require("fs");
const path = require("path");
// The Util module provides access to some utility functions
const util = require("util");
// used to return responses in promise
const writeFilePromise = util.promisify(fs.writeFile);

const { DATA_PATH } = require("../../config");

const persistentPath = path.join(DATA_PATH, `persistent.json`);

if (!fs.existsSync(persistentPath)) {
  console.log("hu");
  fs.writeFileSync(persistentPath, "{}", "utf-8");
}

const cached = JSON.parse(fs.readFileSync(persistentPath, "utf-8"));
// clean the data to be written
const persist = async (data = {}) =>
  await writeFilePromise(
    persistentPath,
    JSON.stringify(data, null, "  "),
    "utf-8"
  );

const persistentDataAccess = (collectionName) => {
  if (!(collectionName in cached)) {
    cached[collectionName] = [];
  }
  const collection = cached[collectionName];

  // there's probably a more conventional signature, this is just POC
  //  throwing errors instead of returning false?
  return {
    create: async (entry = {}) => {
      collection.push(entry);
      // try { // handle errors here or in logic?
      await persist(cached);
      return true;
      // } catch (err) {
      //   return err;
      // }
    },

    update: async (id = "", newEntry = {}) => {
      const found = collection.find((entry) => entry.id === id);
      if (found) {
        newEntry.id = id;
        newEntry.date = new Date();
        const itemIndex = collection.indexOf(found);
        collection[itemIndex] = newEntry;
        await persist(cached);
      } else {
        // or error?
        return false;
      }
    },
    remove: async (id = "") => {
      const found = collection.find((entry) => entry.id === id);
      if (found) {
        const itemIndex = collection.indexOf(found);
        collection.splice(itemIndex, 1);
        await persist(cached);
      } else {
        // or error?
        return false;
      }
    },

    // keep async for consistency
    read: async (id = "") => {
      const found = collection.find((entry) => entry && entry.id === id);
      return found;
    },

    find: async (key = "", value) => {
      const found = collection.find((entry) =>
        util.isDeepStrictEqual(entry[key], value)
      );
      return found;
    },

    all: async () => {
      return collection;
    },
  };
};

module.exports = persistentDataAccess;
