const fs = require("fs");
const Course = require("../models/courses.model");
const { validationResult, body } = require("express-validator");

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).json(newCourse);
};

const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.updateOne({_id:courseId}, {
      $set: { ...req.body },
    });
    return res.status(200).json(course);
  } catch (error) {
    return res.status(400).json({ message: "Invalid Obj Id" }, error);
  }
};

const deleteCourse = (req, res) => {
  const id = +req.params.id;
  let course = courses.find((course) => course.id === id);
  if (!course) {
    return res.status(404).json({ message: "course not found" });
  }
  //courses.splice(id-1,1);
  courses = courses.filter((course) => course.id !== id);
  fs.writeFile("./data/db.json", JSON.stringify(courses), "utf-8", (err) => {
    if (err) {
      throw err;
    }
  });
  res.status(200).json(courses);
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
