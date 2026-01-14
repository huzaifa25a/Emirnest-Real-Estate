import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom';
import {useAuth} from '../context/auth'

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {login} = useAuth();

  const navigate = useNavigate()

  const loginHandle = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.post('http://localhost:3000/api/auth/login', 
        {
          email,
          password,
        }
      )
      login(res.data.token, res.data.user)
      navigate('/');
    }
    catch(error){
      if(error.response.data.message === 'not signed up'){
        setError("Account does not exist! Please sign up.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
      if(error.response.data.message === 'Invalid Credentials'){
        setError("Incorrect Credentials! Please try again.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
      console.error("Problem occured --->",error.response.data.message);
    }
  }

  return (
    <div className='flex justify-center items-center w-full'>
      <div className='flex flex-col w-[400px] bg-slate-100 p-6 rounded-lg max-h-[336px]'>
        <form onSubmit={loginHandle} className='flex flex-col flex-wrap gap-6'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='email'>Enter Email</label>
            <input 
              className='h-8 border-[1px] border-gray-400 w-[350px] p-2 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg'
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='password'>Enter Password</label>
            <input
              className='h-8 border-[1px] border-gray-400 w-[350px] p-2 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg'
              id='pwd'
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className='flex flex-row gap-2 items-center text-center mt-3'>
              <label htmlFor="checkBox">Show Password</label>
              <input
                className='h-[15px] w-[20px] mt-[3px]'
                type='checkbox' 
                name='checkBox'
                onChange={(e) => setShowPassword(!showPassword)}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 w-full items-center'>
            <button
              className='cursor-pointer flex items-center justify-center rounded-lg bg-[#096da7] shadow-md text-white p-3 hover:bg-[#204d67]  transition-all duration-100  h-10 w-[100px]'
              type='submit'
            >
              Login
            </button>
          </div>
        </form>
        {error && 
          <div className='flex justify-center items-center mt-4 bg-red-300 p-1 rounded'>
            <span>{error}</span>
          </div>
        }
        <div className='flex justify-center items-center mt-4'>
          <span>Do not have an account?<NavLink to='/signin'> Register</NavLink></span>
        </div>
      </div>
    </div>
  )
}

export default Signin