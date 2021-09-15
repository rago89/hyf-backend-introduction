const registerBusinessLogic = require("../business-logic/register");
const crypto = require("crypto");

const registerController = {
  createUser: async (req, res) => {
    try {
      const user = req.body.user;
      const password = req.body.password;
      const email = req.body.email;
      if (!user || !password || !email) {
        res.status(400).send("Username, password and email are required");
        return;
      }
      const matchEmail =
        await registerBusinessLogic.registerStore.findUserByEmail(email);

      if (matchEmail)
        res
          .status(400)
          .json({ message: "the email registered is already in use" });

      const hashPassword = hashCreator(password);

      const newUser = await registerBusinessLogic.registerManager.createUser(
        user,
        hashPassword,
        email
      );
      res.json({
        message: `user ${user} was successfully added!`,
        user: newUser,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await registerBusinessLogic.registerManager.getAllUsers();
      res.send(JSON.stringify(users));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await registerBusinessLogic.registerManager.getUser(userId);
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
      await registerBusinessLogic.registerManager.deleteUser(userId);
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
