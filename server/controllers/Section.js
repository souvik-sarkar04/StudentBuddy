const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
// CREATE a new section
exports.createSection = async (req, res) => {
	try {
		/// Extract the required properties from the request body
		const { sectionName, courseId } = req.body;

		/// Validate the input
		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

		/// Create a new section with the given name
		const newSection = await Section.create({ sectionName });

		/// Add the new section to the course's content array
		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		/// Return the updated course object in the response
		res.status(200).json({
			success: true,
			message: `Section created successfully ${req.body}`,
			updatedCourse,
		});
	} catch (error) {
		/// Handle errors
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

/// UPDATE a section
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId,courseId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);

//! Change done in Edtech Frontend 3 (Part 2) : All the code lines written before return -> data has to be sent to backend(backend-frontend collaboration)

		const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

		res.status(200).json({
			success: true,
			message: section,
			//! course data sent to response
			data:course,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

/// DELETE a section
exports.deleteSection = async (req, res) => {
	try {
		
		const { sectionId, courseId }  = req.body;
		/// delete section from  course
		await Course.findByIdAndUpdate(courseId, {
			//? The $pull operator in Mongoose (and MongoDB) is used to remove elements from an array that match a specified condition.
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}
		
		//! Change done in Edtech Frontend 3 (Part 2) : All the code lines written before return -> data has to be sent to backend(backend-frontend collaboration)
		
		/// delete sub section and section
		//? The $in operator in Mongoose (and MongoDB) is used to match any documents where a specified field’s value is within an array of values. 
		await SubSection.deleteMany({_id: {$in: section.subSection}});
		
		await Section.findByIdAndDelete(sectionId);
		
		/// find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();
		
		res.status(200).json({
			success:true,
			message:"Section deleted",
			//! course data sent to response
			data:course
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};   