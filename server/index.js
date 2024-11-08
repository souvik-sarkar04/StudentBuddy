const express = require("express");
const app = express();
const multer = require('multer');
const userRoutes = require("./routes/User");
// const profileRoutes = require("./routes/Profile");
// const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
// const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const {cloudinaryConnect } = require("./config/cloudinary");
// const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const uploadSingle = multer({
	storage: multer.diskStorage({
	  destination: (req, file, cb) => {
		cb(null, 'uploads/');
	  },
	  filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname);
	  }
	}),
  }).single('file'); 
dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

// app.use(
// 	fileUpload({
// 		useTempFiles:true,
// 		tempFileDir:"/tmp",
// 	})
// )
//cloudinary connection
// cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
console.log("Course routes are working")
//! introduction of multer to read form data from useForm() - important bug fix 
app.use("/api/v1/course", multer().none(),  courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoute);

//def route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	}); 
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
	
})

