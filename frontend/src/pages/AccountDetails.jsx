import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/auth'
import Header from '../components/Header'
import Footer from '../components/Footer'

const AccountDetails = () => {
    const [Token, setToken] = useState(localStorage.getItem('token'))
    const [User, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        createdAt: ''
    })
    const {logout} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        async function getUser(){
            try{
                if(!Token){
                    logout();
                    navigate('/')
                    return;
                }
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/accountDetails`,
                    {
                        headers: {Authorization: `Bearer ${Token}`}
                    }
                );
                setUser({
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.phone,
                    createdAt: new Date(response.data.createdAt).toLocaleDateString()
                });
            }
            catch(err){
                console.log('Error occured!',err);
                logout();
                navigate('/')
            }
        }
        
        getUser();
    })

  return (
    <>
        <Header/>
            <div className='flex flex-col items-center gap-10'>
                <h2 className='text-[28px] font-bold'>Account Details</h2>
                <div className='flex flex-col w-[30vw] gap-5 flex-wrap'>
                    <div className='flex justify-between flex-wrap'>
                        <h3 className='font-semibold text-[20px]'>Name</h3>
                        <h3 className='text-[20px]'>{User.name}</h3>
                    </div>
                    <div className='flex justify-between flex-wrap'>
                        <h3 className='font-semibold text-[20px]'>Email</h3>
                        <h3 className='text-[20px]'>{User.email}</h3>
                    </div>
                    <div className='flex justify-between flex-wrap'>
                        <h3 className='font-semibold text-[20px]'>Phone</h3>
                        <h3 className='text-[20px]'>{User.phone}</h3>
                    </div>
                    <div className='flex justify-between flex-wrap'>
                        <h3 className='font-semibold text-[20px]'>Account Created</h3>
                        <h3 className='text-[20px]'>{User.createdAt}</h3>
                    </div>
                </div>
            </div>
    </>
  )
}

export default AccountDetails