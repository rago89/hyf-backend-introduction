require("dotenv").config();
const databaseAccess = require("../data-access/database-register-access");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const loginController = {
  addUserLogin: async (req, res) => {
    try {
      const userOrEmail = req.body.userName;
      const password = req.body.password;
      if (!userOrEmail || !password) {
        res
          .status(401)
          .json({ message: "Username and  password are required" });
        return;
      }
      const hashPassword = hashCreator(password);
      const userRegistered = await databaseAccess.findUserLog(
        userOrEmail,
        hashPassword
      );

      if (!userRegistered) {
        res.status(401).json({ message: "You need to register to login" });
        return;
      }
      const user = {
        userId: userRegistered.id,
        userName: userRegistered.username,
        userEmail: userRegistered.email,
      };

      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.json({
        message: `user '${user.userName}' was successfully logged`,
        user: {
          userId: userRegistered.id,
          userName: userRegistered.userName,
          userEmail: userRegistered.email,
          token: accessToken,
        },
      });
    } catch (error) {
      res.status(401).json({ message: `${error.message}` });
    }
  },
};

function hashCreator(input) {
  return crypto.createHash("sha1").update(input).digest("hex");
}

module.exports = loginController;
