const jwt = require("jsonwebtoken");

module.exports = async (payload, exp = "1d") => {
  return await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: exp,
  });
};
