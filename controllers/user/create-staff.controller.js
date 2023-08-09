const User = require("../../models/user.model");
const mongoose = require("mongoose");

async function register(req, res) {
  return await new Promise(async (resolve, reject) => {
    try {
      if (req.id === undefined || req.organisation === undefined) {
        return res.status(400).json({ message: "😒 Invalid request!!" });
      }

      const { fullname, password, email, phone, phone_alt } = req.body;

      if ((!fullname && !email && !password && !organisation, !phone)) {
        return reject(
          res.status(400).json({
            message:
              "😒 Fullname, email, password, organisation and phone are required!!",
          })
        );
      }

      let user = new User({
        fullname,
        email,
        password,
        organisation: new mongoose.Types.ObjectId(req.organisation),
        phone,
        phone_alt,
      });
      await user.save();

      return resolve(
        res.status(200).json({ message: "🎉 User created successfully!!" })
      );
    } catch (error) {
      return reject(
        error.code === 11000
          ? res.status(400).json({ message: "😒 User already exists!!" })
          : res.status(500).json({ message: "😥 Internal server error!!" })
      );
    }
  });
}

module.exports = {
  method: "post",
  route: "/staff",
  controller: [register],
};
