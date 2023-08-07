const Organisation = require("../../models/organisation.model");
const {
  AdminPermissionsOnly,
} = require("../../middleware/authorization.module");

async function create(req, res) {
  return await new Promise(async (resolve, reject) => {
    try {
      if (req.id === undefined) {
        return res.status(400).json({ message: "😒 Invalid request!!" });
      }

      const { name } = req.body;
      if (!name) {
        return reject(
          res.status(400).json({
            message: "😒 Name is required!!",
          })
        );
      }
      let organisation = await Organisation({
        name,
      });
      await organisation.save();

      return resolve(
        res
          .status(200)
          .json({ message: "🎉 Organisation created successfully!!" })
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
  route: "/organisation/create",
  controller: [AdminPermissionsOnly, create],
};

/**
 * @swagger
 * /api/organisation/create:
 *   post:
 *     summary: Create a new organisation
 *     tags:
 *       - Organisations
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Organisation created successfully
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