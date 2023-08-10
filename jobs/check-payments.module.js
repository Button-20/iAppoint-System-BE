const cron = require("node-cron");
const Payment = require("../models/payment.model");
const paymentConfig = require("../config/payment.config");
const MAX_CHECKS = 3; // Maximum number of checks before considering payment as failed

function checkTransactions() {
  cron.schedule("*/5 * * * *", async () => {
    try {
      const payments = await Payment.find({ status: "PENDING" }).exec();

      for (const payment of payments) {
        const data = await paymentConfig.checkPaymentStatus(payment._id);

        if (data.status_message === "Success") {
          payment.status = "SUCCESSFUL";
          payment.checkCount = 0; // Reset check count on success
        } else {
          payment.checkCount = (payment.checkCount || 0) + 1; // Increment check count
          if (payment.checkCount >= MAX_CHECKS) {
            payment.status = "FAILED"; // Change status to failed after max checks
          }
        }

        await payment.save();
      }
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  });
}

module.exports = checkTransactions;
