const persistentDataAccess = require("../data-access/persistent");

const registerStore = persistentDataAccess("sessions");

const loginManager = {
  createLog: async (token, id) => {
    const userLog = {
      id: id,
      token: token,
      date: new Date(),
    };
    await registerStore.create(userLog);
    return userLog;
  },

  getLog: async (userId) => {
    return await registerStore.read(userId);
  },
  getAllLogs: async () => {
    return await registerStore.all();
  },
  deleteLog: async (userId) => {
    return await registerStore.remove(userId);
  },
};

module.exports = loginManager;
