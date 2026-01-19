import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import gmail from '../assets/icons8-gmail.svg'
import instagram from '../assets/icons8-instagram.svg'
import linkedin from '../assets/icons8-linkedin.svg'

const Footer = () => {
  const live = import.meta.env.VITE_API_BASE_URL;
  const local = 'http://localhost:3000';

  const [email, setEmail] = useState("");
  const [message, showMessage] = useState(false);

  async function sendEmail(){
    const regex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if(!email.match(regex)){
      return alert("Please enter valid email address!");
    }
    try{
      await axios.post(`${live}/api/mailingList/email`, {email})
      .then(
        showMessage(true)
      )
    }
    catch(error){
      console.log(error);
    };
  }

  return (
    <div className='bg-gray-100 left-0 bottom-0 p-4 w-full mt-20'>
      <div className='mt-5 flex flex-row flex-wrap justify-evenly items-start w-full h-auto'>
        <nav className='flex flex-col gap-5'>
          <NavLink to={'/about'}>About Us</NavLink>
          <NavLink to={'/contact'}>Contact Us</NavLink>
          <NavLink to={'/Terms_and_conditions'}>Terms and Privacy Policy</NavLink>
        </nav>
        {!message ? 
          <div className='flex flex-row gap-2 items-center min-w-[600px]'>
            <label htmlFor='subscribe'>Subscribe for latest news:</label>
            <input 
              type='email'
              name='subscribe' 
              className='p-2 h-8 w-[250px] rounded-md border-gray-400 border-[1px] focus:border-[#096da7] focus:border-[2px] focus:outline-none' 
              placeholder='enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              type='submit' 
              className='flex items-center p-2 h-8 border-[1px] text-white rounded-md bg-[#096da7] hover:bg-[#204d67] '
              onClick={sendEmail}
            >
                Send
            </button>
          </div>
          :
          <div className='min-w-[600px] text-center'>
            <span>Thanks for Subscribing!</span>
          </div>
        }
        <div className='flex flex-row gap-4'>
          <a href='mailto:pachisahuzaifa@gmail.com' target='_blank'><img src={gmail} className='h-[35px]'/></a>
          <a href='https://www.instagram.com/huzaifa_pachisa_/?next=%2F' target='_blank'><img src={instagram} className='h-[35px]'/></a>
          <a href='https://www.linkedin.com/in/huzaifa-pachisa-a0723a1b6/' target='_blank'><img src={linkedin} className='h-[35px]'/></a>
        </div>
      </div>
      <p className='w-full text-center mt-5'>&copy; 2026 Emirnest.com</p>
    </div>
  )
}

export default Footer