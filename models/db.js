const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🎉 Connected to MongoDB!!");
  } catch (error) {
    console.log("😥 Error connecting to MongoDB!!");
    console.log(error);
  }
}

require("./user.model.js");

module.exports = connectToDB;
