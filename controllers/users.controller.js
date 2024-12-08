const { validationResult } = require("express-validator");
const User = require("../models/users.model");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const customError = require("../error/error");
const bcrypt = require("bcrypt");

const getAllUsers = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit || 2;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { users } });
});

const getSingleUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id, { __v: false });
  if (!user) {
    return next(new customError("Not Found", 404, httpStatusText.FAIL));
  }
  return res.json({ status: httpStatusText.SUCCESS, data: { user } });
});

const addUser = asyncWrapper(async (req, res, next) => {
  const { name, email, password, username } = req.body;
  // Validate input
  if (!username || username.trim() === "") {
    return next(
      new customError("Username is required", 400, httpStatusText.FAIL)
    );
  }

  // Check for existing email
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return next(
      new customError("User already exists", 400, httpStatusText.FAIL)
    );
  }

  // Check for existing username
  const existingUsername = await User.findOne({ username: username });
  if (existingUsername) {
    return next(
      new customError("Username already exists", 400, httpStatusText.FAIL)
    );
  }
  // password hashing
  const hashedPassword = await bcrypt.hash(password, 8);

  // Create new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    username,
  });

  // Save user
  await newUser.save();
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { newUser: newUser } });
});

const updateUser = asyncWrapper(async (req, res) => {
  const courseId = req.params.id;
  const user = await User.updateOne(
    { _id: courseId },
    {
      $set: { ...req.body },
    }
  );
  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { updatedUser: user },
  });
});

const deleteUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new customError("Not Found", 404, httpStatusText.FAIL));
  }
  return res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  getAllUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
};
