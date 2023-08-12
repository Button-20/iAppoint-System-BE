const User = require("../../models/user.model");
const emailConfig = require("../../config/email.config");
const generateToken = require("../../utils/generateToken");

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "😥 Email is required!!" });

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "😥 User not found!!" });
    }

    const token = generateToken(user._id);

    let emailResponse = await emailConfig.sendMail({
      from: '"iAppoint" <' + process.env.EMAIL + ">", // sender address
      to: email, // list of receivers
      subject: "iAppoint Forgot Password", // Subject line
      text:
        "Dear " +
        user.fullname +
        ",\n\n You have requested to reset your password. Please click on the link below to reset your password.\n\n" +
        process.env.CLIENT_URL +
        "/auth/reset-password/" +
        token +
        "\n\nRegards,\niAppoint Team", // plain text body
      html:
        "<p>Dear " +
        user.fullname +
        ",</p><p>You have requested to reset your password. Please click on the link below to reset your password.</p><p><a href='" +
        process.env.CLIENT_URL +
        "/auth/reset-password/" +
        token +
        "'>Reset Password</a></p><p>Regards,<br />iAppoint Team</p>", // html body
    });

    if (emailResponse.messageId) {
      return res.status(200).json({
        message:
          "😀 An email has been sent to your email address. Please check your email to reset your password.",
      });
    }

    return res.status(500).json({ message: "😥 Internal server error!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "post",
  route: "/forgot-password",
  controller: [forgotPassword],
};
