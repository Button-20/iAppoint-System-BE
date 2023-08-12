const User = require("../../models/user.model");
const emailConfig = require("../../config/email.config");
const jwt = require("jsonwebtoken");

async function resetPassword(req, res) {
  try {
    const { email, password, token } = req.body;

    if (!email || !password || !token) {
      return res.status(400).json({ message: "😥 Invalid request!!" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "😥 User not found!!" });
    }

    let decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken || decodedToken._id !== user._id.toString()) {
      return res.status(400).json({ message: "😥 Invalid token!!" });
    }

    user.password = password;

    await user.save();

    let emailResponse = await emailConfig.sendMail({
      from: '"iAppoint" <' + process.env.EMAIL + ">", // sender address
      to: email, // list of receivers
      subject: "iAppoint Reset Password Success", // Subject line
      text:
        "Dear " +
        user.fullname +
        ",\n\n You have successfully reset your password.\n\nRegards,\niAppoint Team", // plain text body
      html:
        "<p>Dear " +
        user.fullname +
        ",</p><p>You have successfully reset your password.</p><p>Regards,<br />iAppoint Team</p>", // html body
    });

    if (emailResponse.accepted.length > 0) {
      return res
        .status(200)
        .json({ message: "👍 Password reset successful!!" });
    }

    return res.status(500).json({ message: "😥 Internal server error!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "post",
  route: "/reset-password",
  controller: [resetPassword],
};
