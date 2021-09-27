const databaseAccess = require("../data-access/database-register-access");

const registerManager = {
  createUser: async (userName, password, email) => {
    const newUser = {
      userName,
      password,
      email,
      date: new Date(),
    };
    const storeUser = await databaseAccess.create(newUser);

    return storeUser;
  },

  getUser: async (userId) => {
    return databaseAccess.read(userId);
  },
  getAllUsers: async () => {
    return databaseAccess.all();
  },
  deleteUser: async (userId) => {
    return databaseAccess.remove(userId);
  },
};

module.exports = registerManager;
