const cron = require("node-cron");
const Customer = require("../models/customer.model");
const sendSms = require("../config/sms.config");

function sendBirthdayWishes() {
  cron.schedule("0 0 0 * * *", async () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = `${day}-${month}-${year}T00:00:00.000+00:00`;
    const customers = await Customer.find({ dateOfBirth: date });
    customers.forEach((customer) => {
      sendSms(
        customer.phoneNumber,
        `Happy Birthday ${customer.firstname} ${customer.lastname}. From iAppoint, we are wishing you a day filled with joy, laughter, and wonderful moments. May this new year bring you endless happiness and success. Enjoy your special day to the fullest!`
      );
    });
  });
}

module.exports = sendBirthdayWishes;
