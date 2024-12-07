module.exports = class NotFound extends Error{
  constructor(msg){
    super(msg);
    this.name = 'Not Found';
    this.statusCode = 404;
  }
}