const Organisation = require("../../models/organisation.model");
const {
  AdminPermissionsOnly,
} = require("../../middleware/authorization.module");

async function create(req, res) {
  return await new Promise(async (resolve, reject) => {
    try {
      if (req.id === undefined) {
        return res.status(400).json({ message: "😒 Invalid request!!" });
      }

      const { name } = req.body;
      if (!name) {
        return reject(
          res.status(400).json({
            message: "😒 Name is required!!",
          })
        );
      }
      let organisation = await Organisation({
        name,
      });
      await organisation.save();

      return resolve(
        res
          .status(200)
          .json({ message: "🎉 Organisation created successfully!!" })
      );
    } catch (error) {
      console.log(error);
      return reject(
        res.status(500).json({ message: "😥 Internal server error!!" })
      );
    }
  });
}

module.exports = {
  method: "post",
  route: "/organisation/create",
  controller: [AdminPermissionsOnly, create],
};
