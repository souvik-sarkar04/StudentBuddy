import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../../services/operations/profileAPI"
import java from './java.jpeg'
import cpp from './cpp.png'
import python from './python.png'
import html from './html.png'
import css from './css.png'
import js from './js.png'
import react from './react.png'
import tailwind from './tailwind.jpeg'
import mongodb from './mongodb.png'
import angular from './angular.jpeg'
import tick from './tick.jpeg'
export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const enrolledCourses = [
    {
      id: 1,
      thumbnail: java,
      courseName: "Java Lectures",
      courseContent: "Great course",
      totalDuration: 18,
      progressPercentage: "100",
    },
    {
      id: 2,
      thumbnail: cpp,
      courseName: "C++ Lectures",
      courseContent: "Great course",
      totalDuration: 24,
      progressPercentage: "76.66",
    },
    {
      id: 3,
      thumbnail: python,
      courseName: "Python Lectures",
      courseContent: "Great course",
      totalDuration:16,
      progressPercentage: "35.25",
    },
    {
      id: 4,
      thumbnail: html,
      courseName: "HTML Lectures",
      courseContent: "Great course",
      totalDuration: 6,
      progressPercentage: "100",
    },
    {
      id: 5,
      thumbnail: css,
      courseName: "CSS Lectures",
      courseContent: "Great course",
      totalDuration: 12,
      progressPercentage: "92.65",
    },
    {
      id: 6,
      thumbnail: tailwind,
      courseName: "TailwindCSS Lectures",
      courseContent: "Great course",
      totalDuration: 3,
      progressPercentage: "100",
    },
    {
      id: 7,
      thumbnail: js,
      courseName: "JavaScript Lectures",
      courseContent: "Great course",
      totalDuration: 55,
      progressPercentage: "62.35",
    },
    {
      id: 8,
      thumbnail: react,
      courseName: "React Lectures",
      courseContent: "Great course",
      totalDuration: 30,
      progressPercentage: "15.25",
    },
    {
      id: 9,
      thumbnail: angular,
      courseName: "Angular Lectures",
      courseContent: "Great course",
      totalDuration: 20,
      progressPercentage: "8.65",
    },
    {
      id: 10,
      thumbnail: mongodb,
      courseName: "MongoDB Lectures",
      courseContent: "Great course",
      totalDuration: 6,
      progressPercentage: "95.75",
    }
  ]
  return (
    <>
      <div className="text-3xl text-richblack-50 text-center">Enrolled Classes</div>
      <>
       
        <div className="my-8 text-richblack-5">
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
            <p className="flex-1 px-2 py-3">Completion Status</p>
          </div>
          {/* /// Course Names (Cards)*/}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                }`}
              key={i}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?.id}/section/${course.courseName}`
                  )
                   }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription?.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
              <div>
                {
                  course.progressPercentage == 100 ? (<img  className="h-14 w-14 rounded-lg object-cover" src = {tick}/>) : ("")
                }
                </div>
            </div>
          ))}
        </div>
      </>
    </>
  )
}