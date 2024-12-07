const express = require("express");
const { validationUsersSchema } = require("../middlewares/validationSchema");
const usersController = require("../controllers/users.controller");
const router = express.Router();

router
  .route("/") //    /api/users
  .get(usersController.getAllUsers);
  // .post(validationUsersSchema(), usersController.addUser);

router
  .route("/:id")
  .get(usersController.getSingleUser)
  .patch(validationUsersSchema(), usersController.updateUser)
  .delete(usersController.deleteUser);

router.route("/register").post(validationUsersSchema(),usersController.addUser);

router.route("/login").post(usersController.getSingleUser);

module.exports = router;
