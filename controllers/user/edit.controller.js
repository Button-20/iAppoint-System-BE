const User = require("../../models/user.model");

async function editUser(req, res) {
  try {
    if (req.id === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const { fullname, phone } = req.body;
    if (!fullname && !phone) {
      return res.status(400).json({
        message: "😒 Fullname and phone are required!!",
      });
    }

    let user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { fullname, phone },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "😥 User not found!!" });
    }

    return res.status(200).json({ message: "🎉 User updated successfully!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "put",
  route: "/users/:id",
  controller: [editUser],
};

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Edit a user's information
 *     tags:
 *       - Users
 *     security:
 *       - jwt: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user to edit
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
 *               fullname:
 *                 type: string
 *               phone:
 *                 type: string
 *             required:
 *               - fullname
 *     responses:
 *       200:
 *         description: User updated successfully
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