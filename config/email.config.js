const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);
OAuth2_client.setCredentials({
  refresh_token: process.env.EMAIL_REFRESH_TOKEN,
});
const accessToken = OAuth2_client.getAccessToken();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.EMAIL_REFRESH_TOKEN,
    accessToken: accessToken,
  },
});

module.exports = transporter;
