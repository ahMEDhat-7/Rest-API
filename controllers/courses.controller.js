const Course = require("../models/courses.model");
const { validationResult } = require("express-validator");

// get all courses
const getAllCourses = async (req, res) => {
  const courses = await Course.find();
  res.status(200).json({ status: "success", data: { courses } });
};

// get single course
const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }
    return res.json({ status: "success", data: { course } });
  } catch (err) {
    return res.status(400).json({ message: "Invalid Obj Id" });
  }
};

const addCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const newCourse = await Course.insertMany(req.body);
    res.status(201).json({ status: "success", data: { newCourse: newCourse } });
  } catch (error) {
    return res.status(400).json(error);
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
      .json({ status: "success", data: { updatedCourse: course } });
  } catch (error) {
    return res.status(400).json({ message: "Invalid Obj Id" }, error);
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }
    return res
      .status(200)
      .json({ status: "success", data: { deletedCourse: course } });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
