import axios from 'axios'
import React, { useEffect, useState } from 'react'
import img1 from '../assets/emirest_house_images/pexels-binyaminmellish-186077.jpg'
import img2 from '../assets/emirest_house_images/pexels-binyaminmellish-1396122.jpg'
import img3 from '../assets/emirest_house_images/pexels-frans-van-heerden-201846-1438832.jpg'
import img4 from '../assets/emirest_house_images/pexels-luis-yanez-57302-206172.jpg'
import img5 from '../assets/emirest_house_images/pexels-pixabay-164522.jpg'
import img6 from '../assets/emirest_house_images/pexels-pixabay-164558.jpg'
import img7 from '../assets/emirest_house_images/pexels-pixabay-208736.jpg'
import img8 from '../assets/emirest_house_images/pexels-pixabay-209296.jpg'
import img9 from '../assets/emirest_house_images/pexels-pixabay-209315.jpg'
import img10 from '../assets/emirest_house_images/pexels-pixabay-221024.jpg'
import call from '../assets/telephone-fill.svg'
import email from '../assets/envelope-fill.svg'
import bedroom from '../assets/bedroom.svg'
import bathroom from '../assets/bathroom.svg'
import location from '../assets/location.svg'

const Properties = () => {
  const [propertyList, setPropertyList] = useState([]);

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
  
  useEffect(() => {
    async function fetchProperties(){
      const response = await axios.get('http://localhost:3000/api/property/all_properties');
      const properties = response.data;
      console.log(properties);
      setPropertyList(properties);
    }
    fetchProperties();
  }, []);

  return (
    <div className='flex flex-col p-10 justify-center items-center'>
      <h2 className='font-bold text-[24px] mb-10'>Properties available for rent or sale</h2>
      <div className='flex flex-col gap-10'>
        {propertyList && 
          propertyList.map((prop, index) => (
            <div key={index} className='flex flex-row gap-5 border-gray-200 border-[1px]'>
              <img src={images[index]} className='h-[300px] w-[350px]'/>
              <div className='flex flex-col gap-2 p-4 justify-evenly'>
                <span>AED <span className='text-[34px]'>{prop.price}</span> {prop.term}</span>
                <div className='flex flex-row gap-3'>
                  <span className='pr-2 border-r-2 border-gray-200'>{prop.type}</span>
                  <span className='flex flex-row gap-3 pr-2 border-r-2 border-gray-200'> 
                    <span className='flex flex-row gap-2 items-center'>
                      <img src={bedroom} className='h-[20px]'/>
                      {prop.bedrooms}
                    </span>
                    <span className='flex flex-row gap-2 items-center'>
                      <img src={bathroom} className='h-[20px]'/>
                      {prop.bathrooms}
                    </span>
                  </span>
                  <span className='pr-2 border-r-2 border-gray-200'>Area: {prop.area}{prop.areaUnit}</span>
                  <span>Available for: {prop.purpose}</span>
                </div>
                <div className='text-[20px] font-semibold'>
                  {prop.title}
                </div>
                <div className='flex flex-row gap-2 items-center'>
                  <img src={location} className='h-[15px]'/>
                  <span>{prop.address.street}, {prop.address.city}</span><br/>
                </div>
                <div className='flex flex-row gap-5'>
                  <a href={`tel:${prop.ownerPhone}`} className='flex flex-row gap-2 bg-[#a7dfff] p-2 rounded-lg text-[16px] w-[90px] justify-center'>
                    <img src={call} className='h-[25px]'/>
                    Call
                  </a>
                  <a href={`mailto:${prop.ownerEmail}`} className='flex flex-row gap-2 bg-[#a7dfff] p-2 rounded-lg text-[17px] w-[90px] justify-center'>
                    <img src={email} className='h-[25px]'/>
                    Email
                  </a>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Properties