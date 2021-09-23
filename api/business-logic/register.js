const databaseAccess = require("../data-access/database-register-access");

const registerManager = {
  createUser: async (user, password, email) => {
    const newUser = {
      userName: user,
      password: password,
      email: email,
      date: new Date(),
    };
    // await registerStore.create(newUser);
    return { user: newUser, userId: await databaseAccess.create(newUser) };
  },

  getUser: async (userId) => {
    return await databaseAccess.read(userId);
  },
  getAllUsers: async () => {
    return await databaseAccess.all();
  },
  deleteUser: async (userId) => {
    return await databaseAccess.remove(userId);
  },
};

module.exports = registerManager;
