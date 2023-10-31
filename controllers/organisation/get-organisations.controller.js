const Organisation = require("../../models/organisation.model");

async function getOrganisations(req, res) {
  try {
    if (req.id === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    let { search } = req.query;

    const organisations = await Organisation.find({
      name: { $regex: search, $options: "i" },
    });

    if (!organisations) {
      return res.status(404).json({ message: "😥 Organisations not found!!" });
    }

    return res.status(200).json({
      message: "🎉 Organisations fetched successfully!!",
      data: organisations,
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
