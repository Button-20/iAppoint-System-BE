const Customer = require("../../models/customer.model");
const {
  AdminPermissionsOnly,
} = require("../../middleware/authorization.module");

async function getGenderChart(req, res) {
  try {
    if (req.id === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const females = await Customer.countDocuments({
      gender: "female",
    });

    const males = await Customer.countDocuments({
      gender: "male",
    });

    const others = await Customer.countDocuments({
      gender: "other",
    });

    let data = {
      series: [males, females, others],
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                return males + females + others;
              },
            },
          },
        },
      },
      labels: ["Males", "Females", "Others"],
    };

    return res.status(200).json({
      message: "🎉 Chart data sent successfully!!",
      data,
    });
  } catch (ex) {
    console.log(error);
    return res.status(500).json({ message: "😥 Internal server error!!" });
  }
}

module.exports = {
  method: "get",
  route: "/gender-chart",
  controller: [AdminPermissionsOnly, getGenderChart],
};
