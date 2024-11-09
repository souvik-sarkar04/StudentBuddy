import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RiEditBoxLine } from 'react-icons/ri'
import IconBtn from '../../common/IconBtn'
import { useSelector } from 'react-redux'
import Group from './Groups/Group'
const myGroupMembers = [
  {
    id:1,
    title: "Souvik Sarkar",
    email: "jee23launch@gmail.com",
  },
  {
    id:2,
    title: "Vishwajeet Gupta",
    email: 'guptavishwajeet1709@gmail.com',
  },
  {
    id:3,
    title: "Swatantra Maurya",
    email: "swatantra.20233285@mnnit.ac.in",
  },
];
const MyGroups = () => {
   console.log(myGroupMembers)
  return (
    <>
        <h1 className="mb-14 text-center text-3xl font-medium text-richblack-5">
        My Group
      </h1>
      <div className='flex flex-col gap-8' onClick={() => {console.log("Clicking on button")}}>
        {
          myGroupMembers.map((item) => (
            <Group key={item.id} title ={item.title} email= {item.email}/>
           
          
          
          ))
        }
      </div>
    </>
  )
}

export default MyGroups
