const jwt = require("jsonwebtoken");
const asyncWrapper = require("./asyncWrapper");
const customError = require("../error/error");
const httpStatusTxt = require("../utils/httpStatusText");

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
    return next(new customError("Token is Required", 401, httpStatusTxt.ERROR));
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (error) {
    return next(
      new customError("Error Invalid Token", 401, httpStatusTxt.FAIL)
    );
  }
};

module.exports = verifyToken;
