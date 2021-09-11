"use strict";

const cached = {};

const notPersistentDataAccess = (collectionName) => {
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

    find: async (userOrEmail, password) => {
      const found = collection.find((entry) => {
        if (
          (userOrEmail === entry.user && password === entry.password) ||
          (userOrEmail === entry.email && password === entry.password)
        ) {
          return entry;
        }
      });
      return found;
    },
  };
};

module.exports = notPersistentDataAccess;
