import React, { useEffect, useState } from 'react'
import {useAuth} from '../context/auth'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Account = () => {
    const {isLoggedIn, logout} = useAuth();
    const [user, setUser] = useState({
        name : "",
        email: "",
    });

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserInfo(){
            try{
                if(isLoggedIn){
                    const response = await axios.get('http://localhost:3000/api/auth/userInfo',{
                        params: {token: token}
                    });
                    setUser({
                        name: response.data.name,
                        email: response.data.email
                    })
                }
            }
            catch(err){
                console.log("error fetching user info", err);
            }
        }
        getUserInfo()
    }, [])

    const handleLogout = () => {
        logout();
        navigate('/login');
      }

  return (
    <>
        {isLoggedIn ? 
            <div className='flex flex-col items-center gap-6 z-0 bg-[white] border-gray-300 rounded-lg p-4 border-2 top-20 absolute w-[300px] right-2 shadow-md'>
                <span className='text-center'>Welcome, {user.name}!</span>
                {/* <span>Account settings</span> */}
                <button 
                className='text-white px-2 py-1 rounded-md bg-[#f87171] hover:bg-[#ff5858] transition-all duration-100 text-[18px] w-[100px]'
                onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        :
        null
        }
    </>
  )
}

export default Account