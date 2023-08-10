const Customer = require("../../models/customer.model");

async function getCustomersByOrganisation(req, res) {
  try {
    if (req.id === undefined || req.organisation === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const customers = await Customer.find({
      organisation: req.organisation,
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
  route: "/customers-by-organisation",
  controller: [getCustomersByOrganisation],
};
