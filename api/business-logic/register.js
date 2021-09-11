const objectId = require("objectid");

const persistentDataAccess = require("../data-access/persistent");

const registerStore = persistentDataAccess("users");

const registerManager = {
  createUser: async (user, password, email) => {
    const newUser = {
      id: objectId().toString(),
      userName: user,
      password: password,
      email: email,
      date: new Date(),
    };
    await registerStore.create(newUser);
    return newUser;
  },

  getUser: async (userId) => {
    return await registerStore.read(userId);
  },
  getAllUsers: async () => {
    return await registerStore.all();
  },
  deleteUser: async (userId) => {
    return await registerStore.remove(userId);
  },
};

module.exports = { registerManager, registerStore };
