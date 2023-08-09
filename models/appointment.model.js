const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    appointment_date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organisation",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled", "overdue"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the appointment.
 *         description:
 *           type: string
 *           description: The description of the appointment.
 *         customer:
 *           type: string
 *           description: The ID of the associated customer.
 *           format: uuid
 *         user:
 *           type: string
 *           description: The ID of the associated user.
 *           format: uuid
 *       required:
 *         - date
 *         - description
 *         - customer
 *         - user
 */
