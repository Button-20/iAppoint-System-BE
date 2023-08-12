const Ticket = require("../../models/ticket.model");
const Customer = require("../../models/customer.model");
const smsConfig = require("../../config/sms.config");

async function create(req, res) {
  return await new Promise(async (resolve, reject) => {
    try {
      if (req.id === undefined || req.organisation === undefined) {
        return res.status(400).json({ message: "😒 Invalid request!!" });
      }

      const { description, customer, title } = req.body;
      if (!description && !customer && !title) {
        return reject(
          res.status(400).json({
            message:
              "😒 Description, customer and title are required to create a ticket!!",
          })
        );
      }
      let appointment = await Ticket({
        description,
        customer,
        user: req.id,
        title,
        organisation: req.organisation,
      });
      appointment = await appointment.save();

      let customerDetails = await Customer.findById({ _id: customer });
      await smsConfig(
        customerDetails.phone,
        `Dear ${customerDetails.name}, your complain is receiving attention with a ticket no. #${appointment._id}`
      );

      return resolve(
        res
          .status(200)
          .json({ message: "🎉 Appointment created successfully!!" })
      );
    } catch (error) {
      console.log(error);
      return reject(
        res.status(500).json({ message: "😥 Internal server error!!" })
      );
    }
  });
}

module.exports = {
  method: "post",
  route: "/tickets",
  controller: [create],
};
