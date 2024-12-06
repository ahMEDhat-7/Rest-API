

module.exports = (asyncFn)=>{
  return (req,res,next)=>{
    asyncFn(req,res).catch((error)=>{
      next(error);
    });
  };
};