const { validationResult } = require("express-validator");
const User = require("../models/users.model");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");

const getAllUsers = async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: false, _id: false })
    .limit(limit)
    .skip(skip);
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { users } });
};

const getSingleUser = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      status: httpStatusText.FAIL,
      data: { user: null },
      message: "user not found",
    });
  }
  return res.json({ status: httpStatusText.SUCCESS, data: { user } });
});

const addUser = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: httpStatusText.FAIL,
      data: null,
      message: errors.array(),
    });
  }
  const newUser = await User.insertMany(req.body);
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { NewUser: newUser } });
});

const updateUser = asyncWrapper(async (req, res) => {
  const userId = req.params.id;
  const user = await User.updateOne(
    { _id: userId },
    {
      $set: { ...req.body },
    }
  );
  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { updatedUser: user } });
});

const deleteUser = asyncWrapper(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: { user: null },
        message: "user not found",
      });
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
