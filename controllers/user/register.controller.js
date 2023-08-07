const User = require("../../models/user.model");

async function register(req, res) {
  return await new Promise(async (resolve, reject) => {
    try {
      const { fullname, password, email } = req.body;

      if (!fullname && !email && !password) {
        return reject(
          res.status(400).json({
            message: "😒 fullname or email and password are required!!",
          })
        );
      }

      let user = new User({
        fullname,
        email,
        password,
        picture: "https://picsum.photos/200",
      });
      await user.create();

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
 * /register:
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
