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
        
        <div className="text-center py-8 text-4xl font-semibold">
          Earn  
          <HighlightText text={"Rewards "} />
          and
          <HighlightText text={"Aura points "} />
         
        </div>

        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online courses, you can learn at your own pace and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          mentors. Complete courses and assignments before deadline and secure aura points.
        </div>

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




