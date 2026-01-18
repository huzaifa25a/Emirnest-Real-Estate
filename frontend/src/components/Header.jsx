import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import {useAuth} from '../context/auth'
import Home from '../assets/home.svg'
import HomeBlack from '../assets/home_black.svg'

const Header = () => {
  const {isLoggedIn, logout} = useAuth();

  const navigate = useNavigate();

  const logouthandler = () => {
    logout();
    navigate('/login');
  }

  const isHome = useLocation().pathname === "/"

  return (
    <div className = {`flex flex-row flex-wrap justify-between items-center p-6 w-full ${isHome ? '' : 'bg-gray-100'} mb-10`}>
        <div className='flex flex-row gap-2 items-end'>
          <h2 className={`font-bold text-3xl ${ isHome ? 'text-white': ''}`}>Emirnest</h2>
          {isHome ? <img src={Home} className='h-10'/> : <img src={HomeBlack} className='h-10'/>}
        </div>
        <nav className={`flex flex-row justify-center gap-12 items-center w-auto ${isHome ? 'text-white' : ''}`}>
            <NavLink to='/' className={'border-b-transparent border-b-2 active:border-b-[#096da7] focus:border-b-[#096da7] text-[18px]'}>Home</NavLink>
            <NavLink to='/properties' className={'border-b-transparent border-b-2 active:border-b-[#096da7] focus:border-b-[#096da7] text-[18px]'}>Properties</NavLink>
            <NavLink to='/about' className={'border-b-transparent border-b-2 active:border-b-[#096da7] focus:border-b-[#096da7] text-[18px]'}>About</NavLink> 
            <NavLink to='/contact' className={'border-b-transparent border-b-2 active:border-b-[#096da7] focus:border-b-[#096da7] text-[18px]'}>Contact</NavLink>
        </nav>
        {isLoggedIn ?
          <nav className=' flex flex-row justify-end gap-6 items-center'>
            <NavLink to='/list_property' className={'flex items-center p-3 h-10 text-white rounded-md bg-[#096da7] hover:bg-[#204d67] transition-all duration-200 text-[18px] focus:outline-none'}>List your property</NavLink>
            <button onClick={logouthandler} className='text-white px-2 py-1 rounded-md bg-[#f87171] hover:bg-[#ff5858] transition-all duration-100 text-[18px]'>Logout</button>
          </nav>
          :
          <nav className=' flex flex-row justify-end gap-6 items-center'>
            <NavLink to='/login' className={`${isHome ? 'text-white' : 'text-[#096da7] hover:text-[#204d67] '} transition-all duration-100 text-[18px]`}>Login</NavLink>
            <NavLink to='/signin' className={'flex items-center p-3 h-10 border-[1px] text-white rounded-md bg-[#096da7] hover:bg-[#204d67] transition-all duration-200 '}>Register</NavLink>
          </nav>
        }
    </div>
  )
}

export default Header