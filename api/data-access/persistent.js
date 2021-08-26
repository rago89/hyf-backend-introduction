"use strict";

const fs = require("fs");
const path = require("path");
const util = require("util");

// util.promisify a way to create promises
const writeFilePromise = util.promisify(fs.writeFile);

const { DATA_PATH } = require("../../config");

// joins data path and add as last extension the filename
const persistentPath = path.join(DATA_PATH, `persistent.json`);

// if there is not a new file
if (!fs.existsSync(persistentPath)) {
  console.log("hu");
  // create a new file
  fs.writeFileSync(persistentPath, "{}", "utf-8");
}
// read the created file
const cached = JSON.parse(fs.readFileSync(persistentPath, "utf-8"));

const persist = async (data = {}) =>
  await writeFilePromise(
    persistentPath,
    JSON.stringify(data, null, "  "),
    "utf-8"
  );
// add a new array
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
        const itemIndex = collection.indexOf(found);
        collection[itemIndex] = newEntry;
        await persist(cached);
        return true;
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
        return true;
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
