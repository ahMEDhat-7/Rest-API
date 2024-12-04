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
    body("age")
      .notEmpty()
      .isInt({max:50,min:18})
      .withMessage("you are under age you must be in [18-50]"),
  ];
}


module.exports = {
  validationCoursesSchema,
  validationUsersSchema
};