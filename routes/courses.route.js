const express = require("express");
const {validationCoursesSchema} = require('../middlewares/validationSchema');
const coursesController = require('../controllers/courses.controller');
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.route("/") //    /api/courses
            .get(coursesController.getAllCourses)
            .post(verifyToken,validationCoursesSchema(), coursesController.addCourse
            );


router.route("/:id")
            .get(coursesController.getSingleCourse)
            .patch(coursesController.updateCourse)
            .delete(coursesController.deleteCourse);


module.exports = router;