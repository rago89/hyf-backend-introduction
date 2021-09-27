const express = require("express");
const registerController = require("../controllers/register");

const registerRoutes = express.Router();

registerRoutes.post("/register", registerController.createUser);
registerRoutes.get("/register", registerController.getAllUsers);
registerRoutes.get("/register/:userId", registerController.getUser);
registerRoutes.delete("/register/:userId", registerController.deleteUser);

module.exports = registerRoutes;
