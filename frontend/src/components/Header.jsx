import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {useAuth} from '../context/auth'

const Header = () => {
  const {isLoggedIn, logout} = useAuth();

  const navigate = useNavigate();

  const logouthandler = () => {
    logout();
    navigate('/login');
  }

  return (
    <div className = 'flex flex-row flex-wrap justify-between items-center p-6 w-full bg-gray-100 mb-10'>
        <h2 className='font-bold text-xl'>Emirest</h2>
        <nav className='flex flex-row justify-center gap-12 items-center w-auto'>
            <NavLink to='/' className={'border-b-transparent border-b-2 active:border-b-[#096da7] focus:border-b-[#096da7] text-[18px]'}>Home</NavLink>
            <NavLink to='/properties' className={'border-b-transparent border-b-2 active:border-b-[#096da7] focus:border-b-[#096da7] text-[18px]'}>Properties</NavLink>
            <NavLink to='/about' className={'border-b-transparent border-b-2 active:border-b-[#096da7] focus:border-b-[#096da7] text-[18px]'}>About</NavLink> 
            <NavLink to='/contact' className={'border-b-transparent border-b-2 active:border-b-[#096da7] focus:border-b-[#096da7] text-[18px]'}>Contact</NavLink>
        </nav>
        {isLoggedIn ?
          <nav className=' flex flex-row justify-end gap-6 items-center'>
            <NavLink to='/list_property' className={'flex items-center p-3 h-10 border-[1px] text-white rounded-md bg-[#096da7] hover:bg-[#204d67] transition-all duration-200 text-[18px]'}>List your property</NavLink>
            <button onClick={logouthandler} className='text-red-400 hover:text-red-600 transition-all duration-100 text-[18px]'>Logout</button>
          </nav>
          :
          <nav className=' flex flex-row justify-end gap-6 items-center'>
            <NavLink to='/login' className={'text-[#096da7] hover:text-[#204d67] transition-all duration-100 text-[18px]'}>Login</NavLink>
            <NavLink to='/signin' className={'flex items-center p-3 h-10 border-[1px] text-white rounded-md bg-[#096da7] hover:bg-[#204d67] transition-all duration-200 '}>Register</NavLink>
          </nav>
        }
    </div>
  )
}

export default Header