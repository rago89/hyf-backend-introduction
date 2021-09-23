const databaseAccess = require("../data-access/database-register-access");
const registerManager = require("../business-logic/register");
const crypto = require("crypto");

const registerController = {
  createUser: async (req, res) => {
    try {
      const user = req.body.user;
      const password = req.body.password;
      const email = req.body.email;
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
      console.log("Why");
      const hashPassword = hashCreator(password);

      const newUser = await registerManager.createUser(
        user,
        hashPassword,
        email
      );
      console.log(newUser);
      res.json({
        message: `user ${user} was successfully added!`,
        user: newUser,
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await registerManager.getAllUsers();
      res.send(JSON.stringify(users));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await registerManager.getUser(userId);
      res.status(200).send(JSON.stringify(user));
    } catch (error) {
      res.status(400).send(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;
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
      res.status(500).send(error.message);
    }
  },
};

function hashCreator(input) {
  return crypto.createHash("sha1").update(input).digest("hex");
}

module.exports = registerController;
