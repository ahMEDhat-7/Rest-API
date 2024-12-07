const Course = require("../models/courses.model");
const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const customError = require("../error/error");

const getAllCourses = async (req, res) => {
  const query = req.query;
  const limit = query.limit || 5;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { courses } });
};

const getSingleCourse = asyncWrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new customError("Not Found",404,httpStatusText.FAIL));
  }
  return res.json({ status: httpStatusText.SUCCESS, data: { course } });
});

const addCourse = asyncWrapper(async (req, res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new customError(errors.array(),400,httpStatusText.FAIL));
  }
  const newCourse = await Course.insertMany(req.body);
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { newCourse: newCourse } });
});

const updateCourse = asyncWrapper(async (req, res) => {
  const courseId = req.params.id;
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $set: { ...req.body },
    }
  );
  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { updatedCourse: course },
  });
});

const deleteCourse = asyncWrapper(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) {
    return next(new customError("Not Found",404,httpStatusText.FAIL));
  }
  return res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  getAllCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};