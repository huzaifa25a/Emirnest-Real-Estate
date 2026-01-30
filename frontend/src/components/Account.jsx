import React, { useEffect, useState } from 'react'
import {useAuth} from '../context/auth'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import settings from '../assets/settings.svg'
import list from '../assets/list.svg'
import person from '../assets/person.svg'

const Account = () => {
    const live = import.meta.env.VITE_API_BASE_URL;
    // const live = 'http://localhost:3000';

    const {isLoggedIn, logout} = useAuth();
    const [User, setUser] = useState({
        name : "",
        email: "",
    });

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')).name;
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserInfo(){
            try{
                if(isLoggedIn){
                    const response = await axios.get(`${live}/api/auth/userInfo`,{
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

    const listingHandler = () =>{
        navigate('/my-listings');
    }

  return (
    <>
        {isLoggedIn ? 
            <div className='p-4 flex flex-col items-center gap-6 z-0 bg-[white] border-gray-300 rounded-lg border-2 top-20 absolute w-[300px] right-2 shadow-md'>
                <span className='text-center'>Welcome, {user}!</span>
                <div className='flex flex-col'>
                    <span className='flex flex-row gap-3 items-center pl-4 px-1 py-2 w-[300px] text-center border-gray-200 border-y-[2px] border-x-gray-300 border-x-2 cursor-pointer hover:bg-gray-100 duration-200'>
                        <img src={person} className='h-5 w-5'/>
                        Account
                    </span>
                    <span 
                        onClick={listingHandler}
                        className='flex flex-row gap-3 items-center pl-4 px-1 py-2 w-[300px] text-center border-gray-200 border-b-[2px] border-x-gray-300 border-x-2 cursor-pointer hover:bg-gray-100 duration-200'
                    >
                        <img src={list} className='h-5 w-5'/>
                        My Properties
                    </span>
                    <span className='flex flex-row gap-3 items-center pl-4 px-1 py-2 w-[300px] text-center border-gray-200 border-b-[2px] border-x-gray-300 border-x-2 cursor-pointer hover:bg-gray-100 duration-200'>
                        <img src={settings} className='h-5 w-5'/>
                        Settings
                    </span>
                </div> 
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