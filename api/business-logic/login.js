const persistentDataAccess = require("../data-access/persistent");

const loginStore = persistentDataAccess("sessions");

const loginManager = {
  createLog: async (token, id, userName) => {
    const userLog = {
      id: id,
      token: token,
      user: userName,
      date: new Date(),
    };
    await loginStore.create(userLog);
    return userLog;
  },

  getLog: async (userId) => {
    return await loginStore.read(userId);
  },
  getAllLogs: async () => {
    return await loginStore.all();
  },
  deleteLog: async (userId) => {
    return await loginStore.remove(userId);
  },
};

module.exports = { loginManager, loginStore };
