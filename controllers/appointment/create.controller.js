const Appointment = require("../../models/appointment.model");
const Organisation = require("../../models/organisation.model");
const Customer = require("../../models/customer.model");
const smsConfig = require("../../config/sms.config");

async function create(req, res) {
  try {
    if (req.id === undefined || req.organisation === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const { description, customer, appointment_date } = req.body;
    if (!description || !customer || !appointment_date) {
      return res.status(400).json({
        message:
          "😒 Description, customer, and appointment date are required!!",
      });
    }

    const appointment = new Appointment({
      description,
      customer,
      user: req.id,
      appointment_date,
      organisation: req.organisation,
    });
    await appointment.save();

    const [organisation, customerDetails] = await Promise.all([
      Organisation.findById(req.organisation),
      Customer.findById(customer),
    ]);

    await smsConfig(
      customerDetails.phone,
      `Dear ${customerDetails.name}, your next appointment date is  booked for ${appointment_date}. Thank you for doing business with ${organisation.name}.`
    );

    return res
      .status(200)
      .json({ message: "🎉 Appointment created successfully!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "post",
  route: "/appointments",
  controller: [create],
};

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags:
 *       - Appointments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               customer:
 *                 type: string
 *                 description: The ID of the associated customer
 *               user:
 *                 type: string
 *                 description: The ID of the associated user
 *             required:
 *               - description
 *               - customer
 *               - user
 *     responses:
 *       200:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 */
