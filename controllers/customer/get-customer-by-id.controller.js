const Customer = require("../../models/customer.model");

async function getCustomerById(req, res) {
  try {
    if (req.id === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }
    const customers = await Customer.findOne({ _id: req.params.id });

    if (!customers) {
      return res.status(404).json({ message: "😥 Customer not found!!" });
    }

    return res.status(200).json({
      message: "🎉 Customer fetched successfully!!",
      data: customers,
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "get",
  route: "/customers/:id",
  controller: [getCustomerById],
};
