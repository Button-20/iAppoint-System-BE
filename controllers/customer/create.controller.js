const Customer = require("../../models/customer.model");

async function create(req, res) {
  return await new Promise(async (resolve, reject) => {
    try {
      if (req.id === undefined) {
        return res.status(400).json({ message: "😒 Invalid request!!" });
      }

      const { firstname, lastname, phone, dob, phone_alt } = req.body;
      if (!firstname && !lastname && !phone && !dob) {
        return reject(
          res.status(400).json({
            message: "😒 Firstname, lastname, phone and dob are required!!",
          })
        );
      }
      let customer = await Customer({
        firstname,
        lastname,
        phone,
        dob,
        phone_alt,
      });
      await customer.save();

      return resolve(
        res.status(200).json({ message: "🎉 Customer created successfully!!" })
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
  route: "/customers/create",
  controller: [create],
};

/**
 * @swagger
 * /api/customers/create:
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
