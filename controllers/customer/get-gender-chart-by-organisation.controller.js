const Customer = require("../../models/customer.model");

async function getGenderChart(req, res) {
  try {
    if (req.id === undefined || req.organisation === undefined) {
      return res.status(400).json({ message: "😒 Invalid request!!" });
    }

    const females = await Customer.countDocuments({
      organisation: req.organisation,
      gender: "female",
    });

    const males = await Customer.countDocuments({
      organisation: req.organisation,
      gender: "male",
    });

    const others = await Customer.countDocuments({
      organisation: req.organisation,
      gender: "other",
    });

    let randomColor = Math.floor(Math.random() * 16777215).toString(16);

    let data = {
      series: [males, females, others],
      chart: {
        height: 390,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      colors: [`#${randomColor}`, `#${randomColor}`, `#${randomColor}`],
      labels: ["Male", "Female", "Others"],
      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: 50,
        offsetY: 10,
        labels: {
          useSeriesColors: true,
        },
        formatter: function (seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          horizontal: 3,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
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
  route: "/gender-chart-by-organisation",
  controller: [getGenderChart],
};
