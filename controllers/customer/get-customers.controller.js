const Customer = require("../../models/customer.model");

async function getCustomers(req, res) {
  try {
    if (req.id === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    let totalItemsCount = await Customer.countDocuments();
    const customers = await Customer.aggregate({
      $match: {
        $or: [
          { firstname: { $regex: req.query.search, $options: "i" } },
          { lastname: { $regex: req.query.search, $options: "i" } },
        ],
      },
      $facet: {
        data: [
          { $skip: (req.query.page - 1) * req.query.limit },
          { $limit: req.query.limit },
        ],
      },
    });

    if (!customers) {
      return res.status(404).json({ message: "😥 Customers not found!!" });
    }

    return res.status(200).json({
      message: "🎉 Customers fetched successfully!!",
      data: customers,
      itemsPerPage: req.query.itemsPerPage || 10,
      page: req.query.page || 1,
      totalItemsCount: totalItemsCount,
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
