// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../controllers/Course")

// createCourse()

// Categories Controllers Import
// const {
//   showAllCategories,
//   createCategory,
//   categoryPageDetails,
// } = require("../controllers/Category")

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section")

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection")

// // Rating Controllers Import
// const {
//   createRating,
//   getAverageRating,
//   getAllRating,
// } = require("../controllers/RatingAndReview")
      
//! Added in EdTech Frontend 7(Part 2) : 

// const {
//   updateCourseProgress
// } = require("../controllers/courseProgress");

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
// router.post("/createCourse", auth, isInstructor, createCourse)
console.log("Create course route is working")
router.post("/createCourse",auth,  createCourse)
// console.log("req: ", req.body)
//Add a Section to a Course
// router.post("/addSection", auth, isInstructor, createSection)
router.post("/addSection", auth,  createSection)
// Update a Section
// router.post("/updateSection", auth, isInstructor, updateSection)
router.post("/updateSection", auth,  updateSection)
// Delete a Section
router.post("/deleteSection", auth, deleteSection)
// router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
// router.post("/updateSubSection", auth, isInstructor, updateSubSection)
router.post("/updateSubSection", auth,  updateSubSection)
// Delete Sub Section
// router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
router.post("/deleteSubSection", auth,  deleteSubSection)
// Add a Sub Section to a Section
// router.post("/addSubSection", auth, isInstructor, createSubSection)
router.post("/addSubSection", auth, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Edit Course routes
// router.post("/editCourse", auth, isInstructor, editCourse)
router.post("/editCourse", auth, editCourse)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// Delete a Course
router.delete("/deleteCourse", deleteCourse)
       
//! Added in EdTech Frontend 7(Part 2) : 

// router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// // TODO: Put IsAdmin Middleware here
// router.post("/createCategory", auth, isAdmin, createCategory)
// router.get("/showAllCategories", showAllCategories)
// router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
// router.post("/createRating", auth, isStudent, createRating)
// router.get("/getAverageRating", getAverageRating)
// router.get("/getReviews", getAllRating)

module.exports = router