const hashCreator = require("../utils/hash");
const databaseAccess = require("../data-access/database-register-access");
const registerManager = require("../business-logic/register");

const registerController = {
  createUser: async (req, res) => {
    try {
      const { user, email, password } = req.body;

      if (!user) {
        res.status(400).json({ message: "Username, is required" });
        return;
      }
      if (!email) {
        res.status(400).json({ message: "Email, is required" });
        return;
      }
      if (!password) {
        res.status(400).json({ message: "Password, is required" });
        return;
      }
      const matchEmail = await databaseAccess.findUserByEmail(email);

      if (matchEmail) return;

      const hashPassword = hashCreator(password);

      const newUser = await registerManager.createUser(
        user,
        hashPassword,
        email
      );
      res.json({
        message: `user ${user} was successfully added!`,
        user: newUser,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await registerManager.getAllUsers();
      res.send(JSON.stringify(users));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await registerManager.getUser(userId);
      res.status(200).send(JSON.stringify(user));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;
      if (
        userId === "undefined" ||
        userId === "null" ||
        userId === "" ||
        userId === "false"
      ) {
        throw new Error(
          `Id Must be provided to delete user! current id: "${userId}"`
        );
      }
      await registerManager.deleteUser(userId);
      res.status(200).send("user deleted");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = registerController;
