const smsConfig = require("../../config/sms.config.js");

async function sendSms(req, res) {
  const { receipients, message } = req.body;

  if (!receipients || !message) {
    return res.status(400).send({
      message: "Receipients and message are required",
    });
  }

  try {
    const response = await smsConfig(receipients.join(","), message);

    return res.status(200).send({
      message: "Message sent successfully",
      data: response.data,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error sending message",
      error: error.message,
    });
  }
}

module.exports = {
  method: "post",
  route: "/send-sms",
  controller: [sendSms],
};
