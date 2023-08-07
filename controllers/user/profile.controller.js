const User = require("../../models/user.model");

async function profile(req, res) {
  return await new Promise(async (resolve, reject) => {
    try {
      if (req.id === undefined) {
        return reject(
          res.status(400).json({ message: "😒 Invalid request!!" })
        );
      }

      let user = await User.findById({ _id: req.id });

      if (!user) {
        return resolve(
          res.status(404).json({
            message: "😥 User not found!!",
          })
        );
      }
      return resolve(
        res.status(200).json({
          message: "🎉 User found successfully!!",
          data: user,
        })
      );
    } catch (error) {
      return reject(
        res.status(500).json({
          message: "😥 Internal server error!!",
        })
      );
    }
  });
}

module.exports = {
  method: "get",
  route: "/profile",
  controller: [profile],
};

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get the user profile
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
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
