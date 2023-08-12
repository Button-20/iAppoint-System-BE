const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    title: {
      type: String,
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
      enum: ["pending", "resolved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
