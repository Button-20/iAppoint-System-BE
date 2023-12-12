const Appointment = require("../../models/appointment.model");

async function getAppointmentsTotal(req, res) {
  try {
    if (req.id === undefined || req.organisation === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const appointments = await Appointment.countDocuments({
      organisation: req.organisation,
    })

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
  route: "/appointments-total-by-organisation",
  controller: [getAppointmentsTotal]
};
