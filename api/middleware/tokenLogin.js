const jwt = require("jsonwebtoken");

async function tokenChecker(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "You need to register or sign in!" });
      return;
    }

    const jwtChecker = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!jwtChecker) return res.status(403).send(err.message);

    next();
  } catch (error) {
    res.send(error);
  }
}

module.exports = tokenChecker;
