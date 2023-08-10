const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
      default: mongoose.now,
    },
    subscription: {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },
    mobile_network: {
      type: String,
      enum: ["MTN", "AIRTEL", "VODAFONE", "TIGO"],
      required: true,
    },
    mobile_number: {
      type: String,
      required: true,
    },
    trans_ref_no: {
      type: String,
    },
    transaction_no: {
      type: String,
    },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESSFUL", "FAILED"],
      default: "PENDING",
    },
    checkCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
