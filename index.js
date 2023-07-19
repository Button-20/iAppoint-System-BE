require("dotenv").config();
require("./models/db.js");
require("./views/route.js")
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const registerController = require("./controllers/register.controller");

const PORT = process.env.PORT || 3000;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
