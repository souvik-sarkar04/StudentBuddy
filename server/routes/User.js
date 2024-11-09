const express = require("express")
const router = express.Router()

const {
  login,
  signup,
  sendotp,
} = require("../controllers/Auth")


const { auth } = require("../middlewares/auth")


//                                      Authentication routes

router.post("/login", login)

router.post("/signup", signup)

router.post("/sendotp", sendotp)

// Route for Changing the password
// router.post("/changepassword", auth, changePassword)

//                                      Reset Password

// router.post("/reset-password-token", resetPasswordToken)

// router.post("/reset-password", resetPassword)

module.exports = router