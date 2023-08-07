const User = require("../models/user.model.js");

async function AdminPermissionsOnly(req, res, next) {
  try {
    const { id } = req;

    if (!id) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "😥 User not found!!" });
    }

    if (user.role !== "super_admin") {
      return res.status(403).json({ message: "😥 You are not an admin!!" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  AdminPermissionsOnly,
};
