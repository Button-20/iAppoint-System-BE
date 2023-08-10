const {
  AdminPermissionsOnly,
} = require("../../middleware/authorization.module");
const User = require("../../models/user.model");

async function deleteUser(req, res) {
  try {
    if (req.id === undefined || req.params.id === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    if (req.params.id === req.id) {
      return res
        .status(400)
        .json({ message: "😒 You can't delete yourself!!" });
    }

    const user = await User.deleteOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({ message: "😥 User not found!!" });
    }

    return res.status(200).json({ message: "🎉 User deleted successfully!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "delete",
  route: "/users/:id",
  controller: [AdminPermissionsOnly, deleteUser],
};

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request or can't delete yourself
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
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
