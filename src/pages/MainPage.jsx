import { useState } from 'react'
// import Navbar from '../components/core/Navbar.jsx'
// import './App.css'
// import './App.css'
import Calendar from '../components/core/Calendar.jsx'

import { useNavigate } from 'react-router-dom'
function MainPage() {
  const [count, setCount] = useState(0)
  const [cards, setCards] = useState(["Classes", "Assignment", "Study-Goals"])
const navigate = useNavigate()
const handleNavigate = (item) => {
  if(item == "Classes")
  {
    navigate('/dashboard/enrolled-courses')
  }
  else if(item == "Assignment")
    {
      navigate('/dashboard/assignments')
  }
  else if(item == "Study-Goals")
  {
    navigate("/dashboard/my-challenges")
  }
}
  return (
    <>
      {/*Navbar*/}
      {/* <Navbar /> */}
      <h1 className='text-white text-5xl  text-center'>Deadlines</h1>
      <p className='text-white py-3 text-2xl text-caribbeangreen-200 text-center'>Complete assignments within the deadline to get aura points</p>

      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="flex">
        {/* left side content */}
        <div className='h-[calc(100vh-64px)] w-1/4 bg-slate-700'>
          {/* <Calendar className="text-white" onChange={onchange}></Calendar> */}
          <Calendar></Calendar>
        </div>



        {/* right side content */}
        <div className='h-[calc(100vh - 64px)] text-white w-3/4 flex justify-center items-center flex-wrap'>
          <style>
            {`
			  @keyframes border-width {
				from {
				  width: 10px;
				  opacity: 0;
				}
				to {
				  width: 100px;
				  opacity: 1;
				}
			  }
	
			  .animate-border-width {
				animation: border-width 3s infinite alternate;
			  }
			`}
          </style>

          {cards.map((item) => {
            return <div className='relative h-48 w-48 mx-3 cursor-pointer text-white'>
              <div className='absolute top-0 flex w-full justify-center'>
                <div className='left-0 h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000' />
              </div>
              <div className='flex h-full items-center justify-center rounded-md border border-gray-800 bg-gradient-to-b from-gray-800 to-gray-500 px-3 py-2'>
                <h1 className='hover:text-black hover: transition-all hover: ease-linear hover: duration-200 text-2xl font-extrabold text-white'
                onClick={() => {handleNavigate(item)}}>{item}</h1>
              </div>
            </div>
          })
          }

        </div>
      </div>
    </>
  )
}

export default MainPage
