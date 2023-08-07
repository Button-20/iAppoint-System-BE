const jsonwebtoken = require("jsonwebtoken");

module.exports.verifyJwtToken = (req, res, next) => {
  var token;
  if ("authorization" in req.headers)
    token = req.headers["authorization"].split(" ")[1];

  if (!token) next();
  else {
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Token authentication failed." });
      else {
        req.id = decoded._id;
        req.organisation = decoded.organisation;
        next();
      }
    });
  }
};
