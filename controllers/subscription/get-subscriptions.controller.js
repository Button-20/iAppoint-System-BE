const Subscription = require("../../models/subscription.model");
const {
  AdminPermissionsOnly,
} = require("../../middleware/authorization.module");

async function getSuscriptions(req, res) {
  try {
    if (req.id === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const subscriptions = await Subscription.find();
    return res.status(200).json({
      message: "😎 Subscription fetched successfully!!",
      data: subscriptions,
    });
  } catch (error) {
    return res.status(500).json({ message: "😒 Something went wrong!!" });
  }
}

module.exports = {
  method: "get",
  route: "/subscriptions",
  controller: [AdminPermissionsOnly, getSuscriptions],
};
