const Organisation = require("../../models/organisation.model");

async function getOrganisations(req, res) {
  try {
    if (req.id === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    let totalItemsCount = await Organisation.countDocuments();
    const organisations = await Organisation.aggregate({
      $match: {
        $or: [
          { firstname: { $regex: req.query.search, $options: "i" } },
          { lastname: { $regex: req.query.search, $options: "i" } },
        ],
      },
      $facet: {
        data: [
          { $skip: (req.query.page - 1) * req.query.limit },
          { $limit: req.query.limit },
        ],
      },
    });

    if (!organisations) {
      return res.status(404).json({ message: "😥 Organisations not found!!" });
    }

    return res.status(200).json({
      message: "🎉 Organisations fetched successfully!!",
      data: organisations,
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
  route: "/organisations",
  controller: [getOrganisations],
};
