const Organisation = require("../../models/organisation.model");

async function editOrganisation(req, res) {
  try {
    if (req.id === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "😒 Name is required!!",
      });
    }

    let organisation = await Organisation.findOneAndUpdate(
      { _id: req.params.id },
      { name }
    );

    if (!organisation) {
      return res.status(404).json({ message: "😥 Organisation not found!!" });
    }

    return res
      .status(200)
      .json({ message: "🎉 Organisation updated successfully!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "put",
  route: "/organisations/:id",
  controller: [editOrganisation],
};

/**
 * @swagger
 * /organisations/{id}:
 *   put:
 *     summary: Edit an organisation
 *     tags:
 *       - Organisations
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the organisation to edit
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
 *         description: Organisation updated successfully
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
 *         description: Organisation not found
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
