const Payment = require("../../models/payment.model");

async function getPayments(req, res) {
  try {
    if (req.id === undefined || req.organisation === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const payments = await Payment.find({ organisation: req.organisation })
      .populate("subscription")
      .populate("user")
      .populate("organisation")
      .exec();
    return res.status(200).json({
      message: "😎 Payments fetched successfully!!",
      payments,
    });
  } catch (error) {
    return res.status(500).json({ message: "😒 Something went wrong!!" });
  }
}

module.exports = {
  method: "get",
  route: "/payments",
  controller: [getPayments],
};
