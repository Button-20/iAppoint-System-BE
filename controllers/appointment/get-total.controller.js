const Appointment = require("../../models/appointment.model");
const {
  AdminPermissionsOnly,
} = require("../../middleware/authorization.module");

async function getAppointmentsTotal(req, res) {
  try {
    if (req.id === undefined || req.organisation === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const appointments = await Appointment.countDocuments({
      organisation: req.organisation,
    });

    if (!appointments) {
      return res.status(404).json({ message: "😥 Appointments not found!!" });
    }

    return res.status(200).json({
      message: "🎉 Total Appointments fetched successfully!!",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "get",
  route: "/appointments-total",
  controller: [AdminPermissionsOnly, getAppointmentsTotal],
};
