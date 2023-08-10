const Customer = require("../../models/customer.model");

async function getCustomers(req, res) {
  try {
    if (req.id === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const customers = await Customer.find({
      $or: [
        { firstname: { $regex: req.query.search, $options: "i" } }, // 'i' makes it case insensitive
        { lastname: { $regex: req.query.search, $options: "i" } },
      ],
    })
      .populate("organisation")
      .skip((Number(req.query.page) - 1) * Number(req.query.itemsPerPage))
      .limit(Number(req.query.itemsPerPage));

    if (!customers) {
      return res.status(404).json({ message: "😥 Customers not found!!" });
    }

    return res.status(200).json({
      message: "🎉 Customers fetched successfully!!",
      data: customers,
      itemsPerPage: req.query.itemsPerPage || 10,
      page: req.query.page || 1,
      totalItemsCount: customers.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "get",
  route: "/customers",
  controller: [getCustomers],
};

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get a list of customers
 *     tags:
 *       - Customers
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number for pagination
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: The number of items to return per page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *       - name: search
 *         in: query
 *         description: Search query to filter customers by firstname or lastname
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customers fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 itemsPerPage:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalItemsCount:
 *                   type: integer
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Customers not found
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
