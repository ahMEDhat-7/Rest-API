const Course = require("../models/courses.model");
const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpStatusText");
// const {qurey} = require('body-parser');

// get all courses
const getAllCourses = async (req, res) => {
  const query = req.query;
  const limit = query.limit || 2;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const courses = await Course.find({}, { __v: false, _id: false }).limit(limit).skip(skip);
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { courses } });
};

// get single course
const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({
          status: httpStatusText.FAIL,
          data: { course: null },
          message: "course not found",
        });
    }
    return res.json({ status: httpStatusText.SUCCESS, data: { course } });
  } catch (err) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const addCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: httpStatusText.FAIL, message: errors.array() });
    }
    const newCourse = await Course.insertMany(req.body);
    res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { newCourse: newCourse } });
  } catch (error) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: error });
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.updateOne(
      { _id: courseId },
      {
        $set: { ...req.body },
      }
    );
    return res
      .status(200)
      .json({
        status: httpStatusText.SUCCESS,
        data: { updatedCourse: course },
      });
  } catch (error) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: "Invalid Obj Id" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ status: httpStatusText.FAIL, message: "course not found" });
    }
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
  } catch (error) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: "Invalid Obj Id" });
  }
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
