const express = require("express");
const app = express();
const multer = require('multer');
const userRoutes = require("./routes/User");

const courseRoutes = require("./routes/Course");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

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

database.connect();
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


app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	}); 
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
	
})

