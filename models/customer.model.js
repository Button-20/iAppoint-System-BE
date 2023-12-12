const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    picture: {
      type: String,
      default: "",
    },
    phone_alt: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      require: true,
      enum: ["male", "female", "other"],
    },
    dob: {
      type: Date,
      require: true,
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organisation",
      required: true,
    },
  },
  { timestamps: true }
);

customerSchema.pre("save", async function (next) {
  try {
    // picture url
    this.picture =
      "https://ui-avatars.com/api/?name=" +
      this.firstname.replace(" ", "+") +
      "+" +
      this.lastname.replace(" ", "+");
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Customer", customerSchema);

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *           description: The first name of the customer.
 *         lastname:
 *           type: string
 *           description: The last name of the customer.
 *         phone:
 *           type: array
 *           items:
 *             type: string
 *           description: The phone numbers of the customer.
 *         picture:
 *           type: string
 *           format: url
 *           description: The URL of the customer's picture.
 *         dob:
 *           type: string
 *           format: date-time
 *           description: The date of birth of the customer.
 *         organisation:
 *           type: string
 *           description: The ID of the associated organisation.
 *           format: uuid
 *       required:
 *         - firstname
 *         - lastname
 *         - phone
 *         - dob
 *         - organisation
 */
