const {
  AdminPermissionsOnly,
} = require("../../middleware/authorization.module");
const User = require("../../models/user.model");

async function getUsers(req, res) {
  try {
    if (req.id === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    await AdminPermissionsOnly(req, res, async () => {
      const user = await User.find({
        $or: [
          { fullname: { $regex: req.query.search || "", $options: "i" } },
          { email: { $regex: req.query.search || "", $options: "i" } },
        ],
        $where: function () {
          return this.role !== "admin";
        },
      })
        .select("-password")
        .sort({
          [(req.query.sortBy || "createdAt").toString()]:
            req.query.order || "DESC",
        })
        .skip((Number(req.query.page) - 1) * Number(req.query.itemsPerPage))
        .limit(Number(req.query.itemsPerPage));

      if (!result) {
        return res.status(404).json({ message: "😥 Users not found!!" });
      }

      return res.status(200).json({
        message: "🎉 Users fetched successfully!!",
        data: user,
        itemsPerPage: Number(req.query.itemsPerPage) || 10,
        page: Number(req.query.page) || 1,
        totalItemsCount: user.length,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "get",
  route: "/users",
  controller: [getUsers],
};

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     tags:
 *       - Users
 *     parameters:
 *       - name: page
 *         in: query
 *         description: |
 *           The page number for pagination (default: 1)
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - name: itemsPerPage
 *         in: query
 *         description: |
 *           Number of items per page (default: 10, max: 100)
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *       - name: search
 *         in: query
 *         description: |
 *           Search query to filter users by fullname, email, etc.
 *         schema:
 *           type: string
 *       - name: sortBy
 *         in: query
 *         description: |
 *           Field to sort users by (default: createdAt)
 *         schema:
 *           type: string
 *       - name: order
 *         in: query
 *         description: |
 *           Sorting order (ASC or DESC, default: DESC)
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: DESC
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Users not found
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
