import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RiEditBoxLine } from 'react-icons/ri'
import IconBtn from '../../common/IconBtn'
import { useSelector } from 'react-redux'
import Group from './Groups/Group'
import Mentee from './Mentees/Mentee'
const MyMentees = () => {
  const myMentees = [
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
  return (
    <>
        <h1 className="mb-14 text-3xl text-center font-medium text-richblack-5">
        My Mentees
      </h1>
      <div className='flex flex-col gap-8' onClick={() => {console.log("Clicking on button")}}>
        {
          myMentees.map((item) => (
            <Mentee key={item.id} title ={item.title} email= {item.email}/>
           
          
          
          ))
        }
      </div>
    </>
  )
}

export default MyMentees
