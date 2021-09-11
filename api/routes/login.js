const express = require("express");

const loginController = require("../controllers/login");

const loginRoute = express.Router();

loginRoute.post("/login", loginController.addUserLogin);
loginRoute.get("/login", loginController.getAllLogins);
loginRoute.get("/login", loginController.getLogin);
loginRoute.delete("/login", loginController.deleteLogin);

module.exports = loginRoute;
