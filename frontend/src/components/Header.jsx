import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {isLoggedIn, logout} from '../components/auth'

const Header = () => {
  const [loggedIn, setloggedIn] = useState(isLoggedIn());
  const navigate = useNavigate();

  useEffect(() => {
    setloggedIn(isLoggedIn());
  }, []);

  const logouthandler = () => {
    logout();
    setloggedIn(false);
    navigate('/login');
  }

  return (
    <div className = 'flex flex-row flex-wrap justify-around items-center p-10 m-2 w-full'>
        <nav className='flex flex-row justify-center gap-12 items-center w-[800px]'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/properties'>Properties</NavLink>
            <NavLink to='/about'>About</NavLink> 
            <NavLink to='/contact'>Contact</NavLink>
        </nav>
        {loggedIn ?
          <nav>
            <NavLink to='/list_property'>List your property</NavLink>
            <button onClick={logouthandler}>Logout</button>
          </nav>
          :
          <nav className=' flex flex-row justify-end gap-6 items-center'>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/signin'>Register</NavLink>
          </nav>
        }
    </div>
  )
}

export default Header