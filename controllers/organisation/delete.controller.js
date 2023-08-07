const Organisation = require("../../models/organisation.model");

async function deleteOrganisation(req, res) {
  try {
    if (req.id === undefined || req.params.id === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const organisation = await Organisation.deleteOne({ id: req.params.id });

    if (!organisation) {
      return res.status(404).json({ message: "😥 Organisation not found!!" });
    }

    return res
      .status(200)
      .json({ message: "🎉 Organisation deleted successfully!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "delete",
  route: "/organisations/:id",
  controller: [deleteOrganisation],
};

/**
 * @swagger
 * /api/organisations/{id}:
 *   delete:
 *     summary: Delete an organisation
 *     tags:
 *       - Organisations
 *     security:
 *       - jwt: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the organisation to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Organisation deleted successfully
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