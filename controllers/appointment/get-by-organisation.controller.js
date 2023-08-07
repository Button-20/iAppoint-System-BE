const Appointment = require("../../models/appointment.model");

async function getAppointments(req, res) {
  try {
    if (req.id === undefined || req.organisation === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const appointments = await Appointment.find({
      organisation: req.organisation,
      $or: [
        { "customer.firstname": { $regex: req.query.search, $options: "i" } }, // 'i' makes it case insensitive
        { "customer.lastname": { $regex: req.query.search, $options: "i" } },
      ],
    })
      .populate("customer")
      .skip(Number(req.query.page - 1) * Number(req.query.itemsPerPage))
      .limit(Number(req.query.itemsPerPage));

    if (!appointments) {
      return res.status(404).json({ message: "😥 Appointments not found!!" });
    }

    return res.status(200).json({
      message: "🎉 Appointments fetched successfully!!",
      data: appointments,
      itemsPerPage: req.query.itemsPerPage || 10,
      page: req.query.page || 1,
      totalItemsCount: appointments.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "get",
  route: "/appointments",
  controller: [getAppointments],
};
