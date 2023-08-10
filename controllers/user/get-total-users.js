const User = require("../../models/user.model");
const {
  AdminPermissionsOnly,
} = require("../../middleware/authorization.module");

async function getUsersTotal(req, res) {
  try {
    if (req.id === undefined || req.organisation === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const users = await User.countDocuments();

    if (!users) {
      return res.status(404).json({ message: "😥 No Users not found!!" });
    }

    return res.status(200).json({
      message: "🎉 Total User fetched successfully!!",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "get",
  route: "/users-total",
  controller: [AdminPermissionsOnly, getUsersTotal],
};
