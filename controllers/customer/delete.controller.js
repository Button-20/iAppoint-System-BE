const Customer = require("../../models/customer.model");

async function deleteCustomer(req, res) {
  try {
    if (req.id === undefined || req.params.id === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const customer = await Customer.deleteOne({ id: req.params.id });

    if (!customer) {
      return res.status(404).json({ message: "😥 Customer not found!!" });
    }

    return res
      .status(200)
      .json({ message: "🎉 Customer deleted successfully!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "delete",
  route: "/customers/:id",
  controller: [deleteCustomer],
};

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete a customer
 *     tags:
 *       - Customers
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the customer to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer deleted successfully
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
 *         description: Customer not found
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