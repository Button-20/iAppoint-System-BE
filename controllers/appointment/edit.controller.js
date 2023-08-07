const Appointment = require("../../models/appointment.model");

async function editAppointment(req, res) {
  try {
    if (req.id === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const { date, description, customer, user } = req.body;
    if (!date && !description && !customer && !user) {
      return res.status(400).json({
        message: "😒 Date, description, customer and user are required!!",
      });
    }

    let appointment = await Appointment.findOneAndUpdate(
      { id: req.params.id },
      { date, description, customer, user }
    );

    if (!appointment) {
      return res.status(404).json({ message: "😥 Appointment not found!!" });
    }

    return res
      .status(200)
      .json({ message: "🎉 Appointment updated successfully!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "put",
  route: "/appointments/:id",
  controller: [editAppointment],
};

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Edit an appointment
 *     tags:
 *       - Appointments
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the appointment to edit
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *               customer:
 *                 type: string
 *                 description: The ID of the associated customer
 *               user:
 *                 type: string
 *                 description: The ID of the associated user
 *     responses:
 *       200:
 *         description: Appointment updated successfully
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
 *       404:
 *         description: Appointment not found
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
