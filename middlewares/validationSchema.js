const {body} = require('express-validator');

const validationCoursesSchema = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("please provide course title")
      .isLength({ min: 2 })
      .withMessage("please provide course title with least 2 digits"),
    body("price")
      .notEmpty()
      .withMessage("please provide course price"),
  ];
}

const validationUsersSchema = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("please provide user name"),

  ];
}


module.exports = {
  validationCoursesSchema,
  validationUsersSchema
};