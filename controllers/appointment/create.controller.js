const Appointment = require("../../models/appointment.model");

async function create(req, res) {
  return await new Promise(async (resolve, reject) => {
    try {
      if (req.id === undefined) {
        return res.status(400).json({ message: "😒 Invalid request!!" });
      }

      const { description, customer, user } = req.body;
      if (!description && !customer && !user) {
        return reject(
          res.status(400).json({
            message: "😒 Description, customer and user are required!!",
          })
        );
      }
      let appointment = await Appointment({ description, customer, user });
      await appointment.save();

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
  route: "/appointments/create",
  controller: [create],
};

/**
 * @swagger
 * /appointments/create:
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