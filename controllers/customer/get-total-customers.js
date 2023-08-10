const Customer = require("../../models/customer.model");
const {
  AdminPermissionsOnly,
} = require("../../middleware/authorization.module");

async function getCustomersTotal(req, res) {
  try {
    if (req.id === undefined || req.organisation === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const customers = await Customer.countDocuments();

    if (!customers) {
      return res.status(404).json({ message: "😥 No Customers not found!!" });
    }

    return res.status(200).json({
      message: "🎉 Total Customer fetched successfully!!",
      data: customers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "get",
  route: "/customers-total",
  controller: [AdminPermissionsOnly, getCustomersTotal],
};
