const User = require("../../models/user.model");
const mongoose = require("mongoose");

async function register(req, res) {
  return await new Promise(async (resolve, reject) => {
    try {
      const { fullname, password, email, organisation, phone, phone_alt } = req.body;

      if (!fullname && !email && !password && !organisation, !phone) {
        return reject(
          res.status(400).json({
            message: "😒 Fullname, email, password, organisation and phone are required!!",
          })
        );
      }

      if (mongoose.Types.ObjectId.isValid(organisation) === false)
        return reject(
          res.status(400).json({ message: "😒 Invalid organisation id!!" })
        );

      let user = new User({
        fullname,
        email,
        password,
        organisation: new mongoose.Types.ObjectId(organisation),
        phone,
        phone_alt,
      });
      await user.save();

      return resolve(
        res.status(200).json({ message: "🎉 User created successfully!!" })
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
  route: "/register",
  controller: [register],
};

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User object to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               organisation:
 *                 type: string
 *               phone:
 *                 type: string  
 *               phone_alt:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request - fullname, email, and password are required
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
