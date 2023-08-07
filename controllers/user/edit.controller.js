const User = require("../../models/user.model");

async function editUser(req, res) {
  try {
    if (req.id === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const { fullname, phone } = req.body;
    if (!fullname && !phone) {
      return res.status(400).json({
        message: "😒 Fullname and phone are required!!",
      });
    }

    let user = await User.findOneAndUpdate({ id: req.params.id }, { fullname , phone });

    if (!user) {
      return res.status(404).json({ message: "😥 User not found!!" });
    }

    return res.status(200).json({ message: "🎉 User updated successfully!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "put",
  route: "/users/:id",
  controller: [editUser],
};
