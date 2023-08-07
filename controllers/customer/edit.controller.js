const Customer = require("../../models/customer.model");

async function editCustomer(req, res) {
  try {
    if (req.id === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const { firstname, lastname, phone, dob } = req.body;
    if (!firstname && !lastname && !phone && !dob) {
      return res.status(400).json({
        message: "😒 Firstname, lastname, phone and dob are required!!",
      });
    }

    let customer = await Customer.findOneAndUpdate(
      { id: req.params.id },
      { firstname, lastname, phone, dob }
    );

    if (!customer) {
      return res.status(404).json({ message: "😥 Customer not found!!" });
    }

    return res
      .status(200)
      .json({ message: "🎉 Customer updated successfully!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "put",
  route: "/customers/:id",
  controller: [editCustomer],
};
