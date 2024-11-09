import React from 'react';
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsApi"
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementField"

 function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])
console.log("COURSE: ", course)
console.log("EDIT_COURSE: ", editCourse)

 
  const isFormUpdated = () => {
    const currentValues = getValues()
    console.log("changes after editing form values:", currentValues)
    // ? not equal means that the form is updated with new values
    if(!(course?.courseTitle && course?.courseDescription && course?.whatYouWillLearn))
    {
      console.log("Error in course data", course?.courseTitle, " ", course?.courseDescription , " ", course?.whatYouWillLearn)
      return false
    }
      if (
        currentValues.courseTitle !== course?.courseName ||
        currentValues.courseShortDesc !== course?.courseDescription ||
        currentValues.courseBenefits !== course?.whatYouWillLearn 
      ) {
        return true
      }
    
    return false
    
  }

  ///   handle 'Next' button click
  const onSubmit = async (data) => {

    console.log("DATA FORM:", data)
  
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        /// create form data :
        formData.append("courseId", course?._id)
        //? Following values are only appended if they have been CHANGED
        console.log("currentValues.courseTitle : ", currentValues.courseTitle, " ", "course?.courseName : ", course?.courseName)
          console.log("I am inside if of formdata.append")
          formData.append("courseName", data.courseTitle)
          console.log("formData.courseName", formData.get('courseName'), " data.courseTitle :", data.courseTitle)
        // }
        if (currentValues.courseShortDesc !== course?.courseDescription) {
          console.log("I am inside if of formdata.append")
          formData.append("courseDescription", data.courseShortDesc)
          console.log("formData.courseDescription", formData.get('courseDescription'), " data.courseShortDesc :", data.courseShortDesc)
        }
      
        if (currentValues.courseBenefits !== course?.whatYouWillLearn) {
          console.log("I am inside if of formdata.append")
          
          formData.append("whatYouWillLearn", data.courseBenefits)
          console.log("formData.whatYouWillLearn", formData.get('whatYouWillLearn'), " data.courseBenefits :", data.courseBenefits)
        }
       
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
        const object = {};
        formData.forEach((value, key) => {
          object[key] = value;
        });
        console.log("Edit Form data: ", object)
        setLoading(true)
        const result = await editCourseDetails(object, token)
        setLoading(false)
        if (result) { 
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      
      return
    }

    //? The following code is of the situation when we are trying to create a BRAND NEW course - not of updation of course details :
    const formData = new FormData()
    console.log("FORM DATA OBTAINED :", data)
    formData.append("courseName", data?.courseTitle)
    formData.append("courseDescription", data?.courseShortDesc)
    
    formData.append("whatYouWillLearn", data?.courseBenefits)
   
    setLoading(true)
    const obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    console.log(typeof obj)
    console.log("Add Form data: ", obj)
    console.log("Add FormData: ", formData)
    /// calling API for ADDING course details
    const result = await addCourseDetails(formData, token)
    console.log("RESULT :", result)
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
    
  }
  //? Check in MongoDB Compass if a new course is being shown or not after its creation
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register('courseTitle', { required: true })}
          className="form-style w-full"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
          </span>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register('courseShortDesc', { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>
      
      {/* /// Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>
      
      
      {/* /// Next Button */}
      <div className="flex justify-end gap-x-2">
        {!editCourse && (
          <button
          onClick={() => dispatch(setStep(2))} /// we need to go to step 2 if we do not save
          // type="submit"
          disabled={loading}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Without Saving
          </button>
        )}
        {/* /// 2nd button */}
        <button
          disabled={loading}
          // type="submit"
          // onClick={() => dispatch(setStep(2))}
          text={!editCourse ? "Next" : "Save Changes"}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-50 py-[8px] px-[20px] font-semibold text-richblack-900`}
       
        >
          Next
          <MdNavigateNext />
        </button>
      </div>
    </form>
  )
}

export default CourseInformationForm