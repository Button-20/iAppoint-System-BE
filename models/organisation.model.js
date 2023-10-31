const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organisationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

organisationSchema.pre("save", async function (next) {
  try {
    // picture url
    this.picture =
      "https://ui-avatars.com/api/?name=" + this.name.replace(" ", "+");
    next();
  } catch (error) {
    next(error);
  }
});


// Update image url on update
organisationSchema.pre("findOneAndUpdate", async function (next) {
  try {
    // picture url
    this._update.picture =
      "https://ui-avatars.com/api/?name=" + this._update.name.replace(" ", "+");
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Organisation", organisationSchema);

/**
 * @swagger
 * components:
 *   schemas:
 *     Organisation:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the organisation.
 *         picture:
 *           type: string
 *           format: url
 *           description: The URL of the organisation's picture.
 *       required:
 *         - name
 */
