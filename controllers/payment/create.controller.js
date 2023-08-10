const Payment = require("../../models/payment.model");
const paymentConfig = require("../../config/payment.config");

async function createPayment(req, res) {
  return await new Promise(async (resolve, reject) => {
    try {
      if (req.id === undefined) {
        return res.status(400).json({ message: "😒 Invalid request!!" });
      }

      const { amount, subscription, mobile_network, mobile_number } = req.body;

      if (!amount || !subscription || !mobile_network || !mobile_number) {
        return reject(
          res.status(400).json({
            message: "😒 All fields are required!!",
          })
        );
      }
      let payment = await Payment({
        user: req.id,
        amount,
        subscription,
        mobile_network,
        mobile_number,
      });
      payment = await payment.save();
      payment = await payment.populate("user subscription").execPopulate();

      console.log(payment);

      let transaction = await paymentConfig.createPayment({
        _id: payment._id,
        mobile_number: payment.mobile_number,
        mobile_network: payment.mobile_network,
        email: payment.user.email,
        amount: payment.amount,
        _id: payment._id,
        subscription: payment.subscription.name,
      });

      console.log(transaction);

      return resolve(
        res.status(200).json({ message: "🎉 Payment created successfully!!" })
      );
    } catch (error) {
      console.log(error);
      return reject(
        res.status(500).json({ message: "😥 Internal server error!!" })
      );
    }
  });
}

module.exports = {
  method: "post",
  route: "/payment",
  controller: [createPayment],
};
