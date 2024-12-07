module.exports = class customError extends Error {
  constructor(msg, statCode, statusTxt) {
    super();
    this.message = msg;
    this.statusCode = statCode;
    this.statusText = statusTxt;
  }
};
