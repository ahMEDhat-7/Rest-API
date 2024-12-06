const { validationResult } = require("express-validator");
const User = require("../models/users.model");
const httpStatusText = require('../utils/httpStatusText');

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { users } });
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.json({ status: httpStatusText.SUCCESS, data: { user } });
  } catch (err) {
    return res.status(400).json({ message: "Invalid Obj Id" });
  }
};

const addUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const newUser = await User.insertMany(req.body);
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { NewUser: newUser } });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(400).json({ message: "Invalid Obj Id" }, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: null });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
};
