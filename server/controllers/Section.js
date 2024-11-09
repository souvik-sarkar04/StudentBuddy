const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
/// CREATE a new section
exports.createSection = async (req, res) => {
	try {
		const { sectionName, courseId } = req.body;

		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

		const newSection = await Section.create({ sectionName });

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

		res.status(200).json({
			success: true,
			message: `Section created successfully ${req.body}`,
			updatedCourse,
		});
	} catch (error) {
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
		
		await SubSection.deleteMany({_id: {$in: section.subSection}});
		
		await Section.findByIdAndDelete(sectionId);
		
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