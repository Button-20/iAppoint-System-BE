const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      min: 3,
    },
    lastname: {
      type: String,
      required: true,
      min: 3,
    },
    email: {
      type: String,
      default: "",
      sparse: true,
      unique: true,
    },
    phone: {
      type: String,
      default: "",
      sparse: true,
      unique: true,
    },
    profile_picture: {
      type: String,
      default: "",
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    online: {
      type: Boolean,
      default: false,
    },
    authMethod: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);
