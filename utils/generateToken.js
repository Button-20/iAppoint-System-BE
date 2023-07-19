const jwt = require("jsonwebtoken");

module.exports = (user) => {
  const payload = {
    _id: user._id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};
