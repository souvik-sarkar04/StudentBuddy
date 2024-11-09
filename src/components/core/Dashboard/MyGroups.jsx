import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RiEditBoxLine } from 'react-icons/ri'
import IconBtn from '../../common/IconBtn'
import { useSelector } from 'react-redux'
import Group from './Groups/Group'
const MyGroups = () => {
   
  return (
    <div>
        <h1 className="mb-14 text-center text-3xl font-medium text-richblack-5">
        My Group
      </h1>
      <div className='flex flex-col gap-8'>
      <Group/>
      <Group/>
      <Group/>
      <Group/>
      </div>
    </div>
  )
}

export default MyGroups
