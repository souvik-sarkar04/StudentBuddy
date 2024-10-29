import React from 'react'
import {useNavigate} from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate()
  return (
    <div>
      <div className='text-white bg-red-600'>Hiiii</div>
      <button className='text-white' onClick={() => {navigate('/signup')}}>Signup</button>
      <button className='text-white' onClick={() => {navigate('/login')}}>Login</button>
    </div>
  )
}

export default Home

