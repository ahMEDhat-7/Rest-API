const httpStatusText = require('../utils/httpStatusText');

const notFoundHandler = (req,res)=>{
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: "resource not found",
  });
};



module.exports = {
  notFoundHandler
};