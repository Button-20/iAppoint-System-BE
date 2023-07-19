const express = require("express");
const app = express();

const registerController = require("../controllers/register.controller");

app.use("/api/register", registerController);
