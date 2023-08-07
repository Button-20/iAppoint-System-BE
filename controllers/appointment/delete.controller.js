const Appointment = require("../../models/appointment.model");

async function deleteAppointment(req, res) {
  try {
    if (req.id === undefined || req.params.id === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const appointment = await Appointment.deleteOne({ id: req.params.id });

    if (!appointment) {
      return res.status(404).json({ message: "😥 Appointment not found!!" });
    }

    return res
      .status(200)
      .json({ message: "🎉 Appointment deleted successfully!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "delete",
  route: "/appointments/:id",
  controller: [deleteAppointment],
};

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     tags:
 *       - Appointments
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the appointment to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment deleted successfully
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