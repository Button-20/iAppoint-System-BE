const User = require("../../models/user.model");
const generateToken = require("../../utils/generateToken");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res
        .status(400)
        .json({ message: "🤔 Email and password are required!!" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "😥 User not found!!" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "😥 Invalid credentials!!" });
    }

    const token = generateToken(user);

    return res
      .status(200)
      .json({ message: "🎉 User logged in successfully!!", token, data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "post",
  route: "/login",
  controller: [login],
};

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user and generate authentication token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User object for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request - Email and password are required
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
