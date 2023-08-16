const Subscription = require("../../models/subscription.model");
const {
  AdminPermissionsOnly,
} = require("../../middleware/authorization.module");

async function createSubscription(req, res) {
  return await new Promise(async (resolve, reject) => {
    try {
      if (req.id === undefined) {
        return res.status(400).json({ message: "😒 Invalid request!!" });
      }

      const { name, price, description, duration, durationType } = req.body;

      if (!name || !price || !description || !duration || !durationType) {
        return reject(
          res.status(400).json({
            message: "😒 All fields are required!!",
          })
        );
      }

      let subscription = await Subscription({
        name,
        price,
        description,
        duration,
        durationType,
      });

      subscription = await subscription.save();

      return resolve(
        res
          .status(200)
          .json({ message: "🎉 Subscription created successfully!!" })
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
  route: "/subscription",
  controller: [AdminPermissionsOnly, createSubscription],
};
