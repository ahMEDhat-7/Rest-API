const Course = require("../models/courses.model");
const { validationResult, body } = require("express-validator");

// get all courses
const getAllCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }
    return res.json(course);
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
    res.status(201).json(newCourse);
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
    return res.status(200).json(course);
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
    return res.status(200).json(course);
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
