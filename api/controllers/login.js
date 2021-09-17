const loginBusinessLogic = require("../business-logic/login");
const registerBusinessLogic = require("../business-logic/register");
const crypto = require("crypto");

const loginController = {
  addUserLogin: async (req, res) => {
    try {
      const userOrEmail = req.body.user;
      const password = req.body.password;
      if (!userOrEmail || !password) {
        res.status(401).json({ message: "Username and password are required" });
        return;
      }
      const hashPassword = hashCreator(password);
      const userRegistered =
        await registerBusinessLogic.registerStore.findUserLog(
          userOrEmail,
          hashPassword
        );
      if (!userRegistered) {
        res.status(401).json({ message: "You need to register to login" });
        return;
      }
      const userId = userRegistered.id;
      const userName = userRegistered.userName;
      const token = crypto.randomBytes(64).toString("hex");
      const newLog = await loginBusinessLogic.loginManager.createLog(
        token,
        userId,
        userName
      );
      res.json({
        message: `user "${userName}" was successfully logged`,
        user: newLog,
      });
    } catch (error) {
      res.status(401).json({ message: `${error.message}` });
    }
  },
  getAllLogins: async (req, res) => {
    try {
      const users = await loginBusinessLogic.loginManager.getAllLogs();
      res.send(JSON.stringify(users));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getLogin: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await loginBusinessLogic.loginManager.getLog(userId);
      res.status(200).send(JSON.stringify(user));
    } catch (error) {
      res.status(400).send(error);
    }
  },
  deleteLogin: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await loginBusinessLogic.loginManager.deleteLog(userId);
      res.status(200).send("user deleted");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

function hashCreator(input) {
  return crypto.createHash("sha1").update(input).digest("hex");
}

module.exports = loginController;
