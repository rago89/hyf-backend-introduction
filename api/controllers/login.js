require("dotenv").config();
const jwt = require("jsonwebtoken");
const hashCreator = require("../utils/hash");
const databaseAccess = require("../data-access/database-register-access");

const loginController = {
  addUserLogin: async (req, res) => {
    try {
      const { userOrEmail, password } = req.body;

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
        message: `Welcome '${user.userName}'`,
        user: {
          userId: userRegistered.id,
          userName: userRegistered.username,
          userEmail: userRegistered.email,
          token: accessToken,
        },
      });
    } catch (error) {
      res.status(401).json({ message: `${error.message}` });
    }
  },
};

module.exports = loginController;
