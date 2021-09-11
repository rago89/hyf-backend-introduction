const loginManager = require("../business-logic/login");
const registerBusinessLogic = require("../business-logic/register");
const crypto = require("crypto");

const loginController = {
  addUserLogin: async (req, res) => {
    try {
      const userOrEmail = req.body.user;
      const password = req.body.password;
      if (!userOrEmail || !password) {
        res.status(400).send("Username and password are required");
        return;
      }
      const hashPassword = hashCreator(password);
      const userRegistered = await registerBusinessLogic.registerStore.find(
        userOrEmail,
        hashPassword
      );
      console.log(userRegistered);
      if (!userRegistered) {
        res.status(400).send("username or password incorrect");
        return;
      }
      const userId = userRegistered.id;
      const userName = userRegistered.userName;
      const token = crypto.randomBytes(64).toString("hex");
      console.log(token);
      const newLog = await loginManager.createLog(token, userId);
      res.json({
        message: `user ${userName} was successfully logged`,
        user: newLog,
      });
    } catch (error) {
      res.status(400).send("error while login");
    }
  },
  getAllLogins: async (req, res) => {
    try {
      const users = await loginManager.getAllLogs();
      res.send(JSON.stringify(users));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getLogin: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await loginManager.getLog(userId);
      res.status(200).send(JSON.stringify(user));
    } catch (error) {
      res.status(400).send(error);
    }
  },
  deleteLogin: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await loginManager.deleteLog(userId);
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
