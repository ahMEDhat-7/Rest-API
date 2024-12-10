const express = require("express");
const { validationUsersSchema } = require("../middlewares/validationSchema");
const usersController = require("../controllers/users.controller");
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

router
  .route("/") //    /api/users
  .get(verifyToken,usersController.getAllUsers);
// .post(validationUsersSchema(), usersController.addUser);

router
  .route("/:id")
  .get(usersController.getSingleUser)
  .patch(validationUsersSchema(), usersController.updateUser)
  .delete(usersController.deleteUser);

router.route("/register").post(usersController.addUser);

router.route("/login").post(verifyToken,usersController.login);

module.exports = router;
