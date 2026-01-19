import React from 'react'
import Header from '../components/Header'

const About = () => {
  return (
    <>
      <Header/>
      <div className='flex flex-col justify-center items-center p-4 gap-5'>
        <h2 className='font-bold text-[28px]'>About Us</h2>
        <span className='w-[700px] text-justify text-[18px]'>
        Emirnest is a modern real estate platform designed to simplify the way people discover, list, and manage properties across the UAE. We bring together property owners, agents, and seekers on a single, easy-to-use platform focused on transparency, efficiency, and trust.
        <br/><br/>
        Whether you are looking to rent, buy, or list a property, Emirnest helps you make informed decisions with clear listings, accurate details, and a seamless digital experience.
        <br/><br/>
        Our platform is built with modern technology to ensure secure access, fast performance, and a smooth user journey across all devices.
        </span>
      </div>
    </>
  )
}

export default About