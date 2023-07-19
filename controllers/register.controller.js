const express = require("express");
const router = express.Router();
const { Register } = require("../models/register.model");

router.post("/register", async (req, res) => {
    try {
        const registerData = await Register.create(req.body);
        
        res.status(200).json(registerData);
    } catch (e) {
        res.status(400).json(e);
        console.log(e);
    }
  }
);

module.exports = router;
