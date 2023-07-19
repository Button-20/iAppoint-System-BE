const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
  },
});

const Register = mongoose.model("Register", registerSchema);
module.exports = { Register};
