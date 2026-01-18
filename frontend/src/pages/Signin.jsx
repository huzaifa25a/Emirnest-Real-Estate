import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom';
import {useAuth} from '../context/auth'
import Header from '../components/Header'

const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {login} = useAuth();
  const navigate = useNavigate()

  const signin = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      return alert('The password do not match!');
    }
    try{
      const res = await axios.post('http://localhost:3000/api/auth/signin', 
        {
          username: name,
          email,
          password,
        }
      )
      login(res.data.token, res.data.user);
      navigate('/');
    }
    catch(error){
      if(error.response.data.message === 'User already exists'){
        setError("Account Already exists! please log in.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
      console.error("Problem occured --->",error.response);
    }
  }

  return (
    <>
      <Header/>
      <div className='flex justify-center items-center w-full'>
        <div className='flex flex-col w-[400px] bg-slate-100 p-6 rounded-lg'>
          <form onSubmit={signin} className='flex flex-col flex-wrap gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='name'>Enter your name</label>
              <input 
                className='h-8 border-[1px] border-gray-400 w-[350px] p-2 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg'
                type='text'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
                type= {showPassword ? 'text' : 'password'}
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password" 
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input
                className='h-8 border-[1px] border-gray-400 w-[350px] p-2 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg'
                id='cf_pwd'
                type= {showPassword ? 'text' : 'password'}
                name='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password" 
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
                className='cursor-pointer flex items-center justify-center rounded-lg bg-[#096da7] shadow-md text-white p-3 hover:bg-[#204d67]  transition-all duration-100  h-10 w-[200px]'
                type='submit'
              >
                Create Account
              </button>
            </div>
          </form>
          {
            error && 
            <div className='flex justify-center items-center mt-4 bg-red-300 p-1 rounded'>
              <span>{error}</span>
            </div>
          }
          <div className='flex justify-center items-center mt-4'>
            <span>Already have an account?<NavLink to='/login'> Login</NavLink></span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin