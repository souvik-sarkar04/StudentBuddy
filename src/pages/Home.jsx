import React from 'react'
import CTAButton from "../components/core/HomePage/Button"
import { FaArrowRight } from "react-icons/fa"
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import HighlightText from '../components/core/HomePage/HighlightText'
const Home = () => {
    const navigate = useNavigate()
  return (
    <div>
      <div className='text-5xl px-2 py-8 text-center'>

      <HighlightText text = {"EduTrackers"}/>
      </div>
      {/* //? Section 1 */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        {/* /// Become a Instructor Button */}
        {/* <Link to={"/signup"}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold
           text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">

            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
               <FaArrowRight /> 
            </div>
          </div>
        </Link> */}

        {/* Heading */}
        <div className="text-center py-8 text-4xl font-semibold">
          Earn  
          <HighlightText text={"Rewards "} />
          and
          <HighlightText text={"Aura points "} />
         
        </div>

        {/* /// Sub Heading */}
        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online courses, you can learn at your own pace and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          mentors. Complete courses and assignments before deadline and secure aura points.
        </div>

        {/* /// CTA Buttons */}
        <div className="mt-8 flex flex-row gap-7">

          <CTAButton active={true} linkto={"/signup"}>
          <div className='flex'>
           Signup
           <FaArrowRight /> 
          </div>
          </CTAButton>
            
          <CTAButton active={false} linkto={"/login"}>
          <div className='flex'>
           Login
           <FaArrowRight /> 
          </div>
          </CTAButton>
        </div>
</div>
</div>
  )
}

export default Home

/*

netstat -ano | findstr :3000
Note the PID from the output, then kill it with:
bash
Copy code
taskkill /PID 31292 /F
Mongodb atlas :
username :
souvikmnnit04
password : 
6OxFPs6uNz6HYGlh
*/



