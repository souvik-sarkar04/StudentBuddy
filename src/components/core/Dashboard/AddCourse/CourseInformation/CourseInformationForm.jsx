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
  } = useForm(
  //   {
  //   courseTitle : "",
  //   courseShortDesc : "",
  //   courseBenefits : ""
  // }
)
// console.log(useForm())
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])
console.log("COURSE: ", course)
console.log("EDIT_COURSE: ", editCourse)
/*
  useEffect(() => {
    // const getCategories = async () => {
    //   setLoading(true)
    //   const categories = await fetchCourseCategories() /// from courseDetailsAPI.js which connects with categories controllers in backend
    //   if (categories.length > 0) { ///valid case
    //     // console.log("categories", categories)
    //     setCourseCategories(categories)
    //   }
    //   setLoading(false)
    // }
    /// if form is in edit mode (setValue() comes from useForm() hook)
    if (editCourse) {
      // console.log("data populated", editCourse)
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      // setValue("coursePrice", course.price)
      // setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      // setValue("courseCategory", course.category)
      // setValue("courseRequirements", course.instructions)
      // setValue("courseImage", course.thumbnail)
    }
    // getCategories()

  }, [])

  */
 
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
        // currentValues.coursePrice !== course.price ||
        // currentValues.courseTags.toString() !== course.tag.toString() ||
        currentValues.courseBenefits !== course?.whatYouWillLearn 
        // ||
        // currentValues.courseCategory._id !== course.category._id ||
        // currentValues.courseImage !== course.thumbnail ||
        
        //? currentValues.courseRequirements.toString() !==
        // course.instructions.toString() 
        // ||
      
      ) {
        return true
      }
    
    return false
    
  }

  ///   handle 'Next' button click
  const onSubmit = async (data) => {

    console.log("DATA FORM:", data)
    // if (editCourse) { /// if i am trying to edit the course (by default, editCourse is false in courseSlice.js)
    
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        /// create form data :
        formData.append("courseId", course?._id)
        //? Following values are only appended if they have been CHANGED
        console.log("currentValues.courseTitle : ", currentValues.courseTitle, " ", "course?.courseName : ", course?.courseName)
        // if (currentValues.courseTitle !== course?.courseName) {
          console.log("I am inside if of formdata.append")
          formData.append("courseName", data.courseTitle)
          console.log("formData.courseName", formData.get('courseName'), " data.courseTitle :", data.courseTitle)
        // }
        if (currentValues.courseShortDesc !== course?.courseDescription) {
          console.log("I am inside if of formdata.append")
          formData.append("courseDescription", data.courseShortDesc)
          console.log("formData.courseDescription", formData.get('courseDescription'), " data.courseShortDesc :", data.courseShortDesc)
        }
        // if (currentValues.coursePrice !== course.price) {
        //   formData.append("price", data.coursePrice)
        // }
        // if (currentValues.courseTags.toString() !== course.tag.toString()) {
        //   formData.append("tag", JSON.stringify(data.courseTags))
        // }
        if (currentValues.courseBenefits !== course?.whatYouWillLearn) {
          console.log("I am inside if of formdata.append")
          
          formData.append("whatYouWillLearn", data.courseBenefits)
          console.log("formData.whatYouWillLearn", formData.get('whatYouWillLearn'), " data.courseBenefits :", data.courseBenefits)
        }
        // if (currentValues.courseCategory._id !== course.category._id) {
        //   formData.append("category", data.courseCategory)
        // }
        //? if (
        //   currentValues.courseRequirements.toString() !==
        //   course.instructions.toString()
        // ) {
        //   formData.append(
        //     "instructions",
        //     JSON.stringify(data.courseRequirements)
        //   )
        // }
        // if (currentValues.courseImage !== course.thumbnail) {
        //   formData.append("thumbnailImage", data.courseImage)
        // }
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
        const object = {};
        formData.forEach((value, key) => {
          object[key] = value;
        });
        console.log("Edit Form data: ", object)
        setLoading(true)
        ///API Call for EDIT course(courseDetailsAPI.js)(storing edited details in DB)
        const result = await editCourseDetails(object, token)
        setLoading(false)
        if (result) { /// If changes are made to the error, move to step 2 and set course = updated values
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      // } else {
      //   toast.error("No changes made to the form")
      // }
      return
    }

    //? The following code is of the situation when we are trying to create a BRAND NEW course - not of updation of course details :
    const formData = new FormData()
    console.log("FORM DATA OBTAINED :", data)
    //? Error resolving : do not append same data multiple times to formData -> error
    formData.append("courseName", data?.courseTitle)
    formData.append("courseDescription", data?.courseShortDesc)
    // formData.append("price", data.coursePrice)
    // formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data?.courseBenefits)
    // formData.append("category", data.courseCategory)
    // formData.append("status", COURSE_STATUS.DRAFT)
    // formData.append("instructions", JSON.stringify(data.courseRequirements))
    // formData.append("thumbnailImage", data.courseImage)
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
// onSubmit()
  //? Check in MongoDB Compass if a new course is being shown or not after its creation
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      {/* Course Title */}
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
      {/* /// Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        {/* /// Textarea tag to write description */}
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
      {/* /// Course Price */}
      {/* <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div> */}
      {/* /// Course Category */}
      {/* <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory"> 
          Course Category
         
          <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))
          }
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div> */}
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
      {/* /// Create a custom component for handling tags input : Course Tags */}
      {/* <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      /> */}
      {/* /// Course Thumbnail Image (uploading and showing preview of media) */}
      {/* <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      /> */}
      {/* /// Requirements/Instructions */}
      {/* <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      /> */}
      
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