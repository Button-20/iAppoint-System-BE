// const cross_switch = require("cross-switch-gh")(
//   process.env.PAYMENT_APP_ID,
//   process.env.PAYMENT_APP_KEY,
//   false
// );

// module.exports.createPayment = async (payment) => {
//   try {
//     let resp = await cross_switch.payment.createPayment({
//       type: "Send", // "Receive || Send",
//       name: payment.name,
//       mobile: payment.mobile_number, // "233244123456",
//       mobile_network: payment.mobile_network, // "MTN || AIRTEL || TIGO || VODAFONE",
//       email: payment.email,
//       currency: "GHS",
//       amount: payment.amount,
//       order_id: payment._id,
//       order_desc: `Payment for ${payment.subscription} subscription`,
//       account: "",
//       customerid: "",
//     });
//     console.log(resp);
//     return resp;
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports.checkPaymentStatus = async (order_id) => {
//   try {
//     let resp = await fetch(
//       "https://app.alias-solutions.net:5020/Integration/v1/GetTransStatus",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           app_id: process.env.PAYMENT_APP_ID,
//           app_key: process.env.PAYMENT_APP_KEY,
//           order_id: order_id,
//           type: "Send",
//         }),
//       }
//     );
//     let data = await resp.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
