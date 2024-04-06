const Ticket = require("../../models/ticket.model");

async function getTickets(req, res) {
  try {
    if (req.id === undefined || req.organisation === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    // Search for tickets by organisation, populate customer field and search by customer first name and last name
    const tickets = await Ticket.find({
      organisation: req.organisation,
    })
      .sort({ createdAt: -1 })
      .populate("customer")
      .skip(Number(req.query.page - 1) * Number(req.query.itemsPerPage))
      .limit(Number(req.query.itemsPerPage));

    if (!tickets) {
      return res.status(404).json({ message: "😥 Tickets not found!!" });
    }

    if (req.query.search) {
      tickets = tickets.filter((ticket) => {
        return (
          ticket.customer.firstname
            .toLowerCase()
            .includes(req.query.search.toLowerCase()) ||
          ticket.customer.lastname
            .toLowerCase()
            .includes(req.query.search.toLowerCase())
        );
      });
    }

    // Get total number of tickets
    const totalTickets = await Ticket.countDocuments({
      organisation: req.organisation,
    });

    if (!totalTickets) {
      return res.status(404).json({ message: "😥 Tickets not found!!" });
    }

    return res.status(200).json({
      message: "🎉 Tickets fetched successfully!!",
      data: tickets,
      itemsPerPage: req.query.itemsPerPage || 10,
      page: req.query.page || 1,
      totalItemsCount: req.query.search ? tickets.length : totalTickets,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "get",
  route: "/tickets-by-organisation",
  controller: [getTickets],
};
