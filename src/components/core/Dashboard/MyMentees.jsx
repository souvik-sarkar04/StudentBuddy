import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RiEditBoxLine } from 'react-icons/ri'
import IconBtn from '../../common/IconBtn'
import { useSelector } from 'react-redux'
import Group from './Groups/Group'
import Mentee from './Mentees/Mentee'
const MyMentees = () => {
   
  return (
    <div>
        <h1 className="mb-14 text-3xl text-center font-medium text-richblack-5">
        My Mentees
      </h1>
      <div className='flex flex-col gap-8'>
      <Mentee/>
      <Mentee/>
      <Mentee/>
      <Mentee/>
      
      </div>
    </div>
  )
}

export default MyMentees
