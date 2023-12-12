const Customer = require("../../models/customer.model");
const Organisation = require("../../models/organisation.model");
const smsConfig = require("../../config/sms.config");

async function create(req, res) {
  try {
    if (req.id === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const { firstname, lastname, phone, gender, dob, email, phone_alt } =
      req.body;
    if (!firstname && !lastname && !phone && !gender && !dob && !email) {
      return res.status(400).json({
        message: "😒 Firstname, lastname, phone, gender and dob are required!!",
      });
    }
    let customer = await Customer({
      firstname,
      lastname,
      email,
      phone,
      gender,
      dob,
      phone_alt,
      organisation: req.organisation,
    });
    await customer.save();

    let organisation = await Organisation.findById({ _id: req.organisation });

    // send sms
    const message = `Hey ${firstname} ${lastname}, , welcome to the ${organisation.name} family!  We're thrilled to have you join us and excited to help you find the perfect eyewear to enhance your vision and style. For further information please call 0544257189 or 0243424984.`;
    await smsConfig(phone, message);

    return res
      .status(200)
      .json({ message: "🎉 Customer created successfully!!" });
  } catch (error) {
    console.log(error);
    return error.code === 11000
      ? res.status(400).json({ message: "😒 Customer phone already exist!!" })
      : res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "post",
  route: "/customers",
  controller: [create],
};

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     tags:
 *       - Customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               phone:
 *                 type: array
 *                 items:
 *                   type: string
 *               dob:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - firstname
 *               - lastname
 *               - phone
 *               - dob
 *     responses:
 *       200:
 *         description: Customer created successfully
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
