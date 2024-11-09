const express = require("express")
const router = express.Router()


const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../controllers/Course")

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section")

const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection")



const { auth, isInstructor, isStudent } = require("../middlewares/auth")

                                      // Course routes

// router.post("/createCourse", auth, isInstructor, createCourse)
console.log("Create course route is working")
router.post("/createCourse",auth,  createCourse)

router.post("/addSection", auth,  createSection)

router.post("/updateSection", auth,  updateSection)
router.post("/deleteSection", auth, deleteSection)

router.post("/updateSubSection", auth,  updateSubSection)

router.post("/deleteSubSection", auth,  deleteSubSection)

router.post("/addSubSection", auth, createSubSection)
router.get("/getAllCourses", getAllCourses)
router.post("/getCourseDetails", getCourseDetails)
router.post("/getFullCourseDetails", auth, getFullCourseDetails)

router.post("/editCourse", auth, editCourse)
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
router.delete("/deleteCourse", deleteCourse)
       


module.exports = router