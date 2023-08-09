const cron = require("node-cron");
const Appointment = require("../models/appointment.model");

function checkAppointments() {
  cron.schedule("0 0 0 * * *", async () => {
    console.log("Running Cron Job to check appointments");
    const appointments = await Appointment.find({ status: "pending" });
    const today = new Date();
    appointments.forEach(async (appointment) => {
      const appointmentDate = new Date(appointment.appointment_date);
      if (appointmentDate < today) {
        await Appointment.findByIdAndUpdate(appointment._id, {
          status: "overdue",
        });
      }
    });
  });
}

module.exports = checkAppointments;
