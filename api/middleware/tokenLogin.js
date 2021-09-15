const loginBusinessLogic = require("../business-logic/login");

async function tokenChecker(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    const authHeaderArray = authHeader.split(" ");

    const token = authHeaderArray[1];

    if (!token) {
      res.status(401).json({ message: "You need to register or sign in!" });
      return;
    }

    if (!(authHeaderArray[0] === "bearer" && authHeaderArray.length === 2)) {
      res.status(401).json({ message: "You need to register or sign in!" });
      return;
    }

    const session = await loginBusinessLogic.loginStore.findToken(token);

    if (!session) {
      res.status(401).send(session);
      return;
    }
    next();
  } catch (error) {
    res.send(error);
  }
}

module.exports = tokenChecker;
