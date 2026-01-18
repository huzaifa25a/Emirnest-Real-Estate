import React from 'react'
import Header from '../components/Header'

const About = () => {
  return (
    <>
      <Header/>
      <div className='flex flex-col justify-center items-center p-4 gap-5'>
        <h2 className='font-bold text-[24px]'>About Us</h2>
        <span className='w-[700px] text-justify'>
          Emirnest is a modern real estate platform designed to help users explore and list properties for rent or sale across the UAE. Built with simplicity and usability in mind, the platform connects property owners and seekers through a secure and easy-to-use interface.
        </span>
      </div>
    </>
  )
}

export default About