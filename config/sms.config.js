module.exports = async (receipient, message) => {
  let resp = await fetch(
    `https://deywuro.com/api/sms?username=${process.env.SMS_USERNAME}&password=${process.env.SMS_PASSWORD}&source=${process.env.SMS_SENDERID}&destination=${receipient}&message=${message}}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let data = await resp.json();
  return data;
};
