const Ticket = require("../../models/ticket.model");

async function editTicket(req, res) {
  try {
    if (req.id === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const { description, title, status } = req.body;
    if (!description && !title && !status)
      return res.status(400).json({
        message: "😒 Date, description, customer and user are required!!",
      });

    let ticket = await Ticket.findOneAndUpdate(
      { id: req.params.id },
      { description, title, status }
    );

    if (!ticket) {
      return res.status(404).json({ message: "😥 Ticket not found!!" });
    }

    return res
      .status(200)
      .json({ message: "🎉 Ticket updated successfully!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "put",
  route: "/tickets/:id",
  controller: [editTicket],
};

/**
 * @swagger
 * /tickets/{id}:
 *   put:
 *     summary: Edit an ticket
 *     tags:
 *       - Tickets
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the ticket to edit
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
 *         description: Ticket updated successfully
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
 *         description: Ticket not found
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
