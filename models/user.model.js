const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: [
      {
        type: String,
        required: true,
        unique: true,
      },
    ],
    picture: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "super_admin"],
      required: true,
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organisation",
      required: true,
    },
  },
  { timestamps: true }
);

// hash password before saving to database
userSchema.pre("save", async function (next) {
  try {
    // generate a salt
    const salt = await bcrypt.genSalt(10);
    // generate a password hash (salt + hash)
    const passwordHash = bcrypt.hash(this.password, salt);
    // re-assign hashed version over original, plain text password
    this.password = passwordHash;
  
    // picture url
    this.picture =
      "https://ui-avatars.com/api/?name=" + this.fullname.replace(" ", "+");
    next();
  } catch (error) {
    next(error);
  }
});

// compare password in the database and the one that the user type in
userSchema.methods.comparePassword = async function (typedPassword) {
  try {
    return await bcrypt.compare(typedPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("User", userSchema);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         fullname:
 *           type: string
 *           description: The full name of the user.
 *         password:
 *           type: string
 *           format: password
 *           description: The user's password.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         picture:
 *           type: string
 *           format: url
 *           description: The URL of the user's picture.
 *         role:
 *           type: string
 *           enum: [user, super_admin]
 *           description: The role of the user.
 *         organisation:
 *           type: string
 *           description: The ID of the associated organisation.
 *           format: uuid
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - fullname
 *         - password
 *         - email
 *         - role
 *         - organisation
 */
