const Payment = require("../../models/payment.model");

async function getPayments(req, res) {
  try {
    if (req.id === undefined || req.organisation === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const payments = await Payment.find()
      .populate("subscription")
      .populate("user")
      .populate("organisation")
      .sort({ createdAt: -1 })
      .skip(Number(req.query.page - 1) * Number(req.query.itemsPerPage))
      .limit(Number(req.query.itemsPerPage))
      .exec();
    return res.status(200).json({
      message: "😎 Payments fetched successfully!!",
      data: payments,
      totalItemsCount: payments.length,
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
