const Appointment = require("../../models/appointment.model");

async function getAppointments(req, res) {
  try {
    if (req.id === undefined || req.organisation === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    let totalItemsCount = await Appointment.countDocuments({
      organisation: req.organisation,
    });
    const appointments = await Appointment.aggregate({
      $match: {
        organisation: req.organisation,
      },
      $or: [
        { date: { $gte: req.query.startDate, $lte: req.query.endDate } },
        { customer: { $in: req.query.customer } },
        { user: { $in: req.query.user } },
        { description: { $regex: req.query.description, $options: "i" } },
      ],
    })
      .facet({
        metadata: [{ $count: "totalItemsCount" }],
        data: [
          { $skip: (req.query.page - 1) * req.query.limit },
          { $limit: req.query.limit },
        ],
      })
      .lookup({
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      })
      .lookup({
        from: "customers",
        localField: "customer",
        foreignField: "_id",
        as: "customer",
      })
      .project({
        _id: 1,
        date: 1,
        description: 1,
        user: { $arrayElemAt: ["$user", 0] },
        customer: { $arrayElemAt: ["$customer", 0] },
      });

    if (!appointments) {
      return res.status(404).json({ message: "😥 Appointments not found!!" });
    }

    return res.status(200).json({
      message: "🎉 Appointments fetched successfully!!",
      data: appointments,
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
  route: "/appointments",
  controller: [getAppointments],
};
