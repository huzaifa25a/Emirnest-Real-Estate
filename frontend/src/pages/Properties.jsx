import axios from 'axios'
import React, { useEffect, useState } from 'react'
import img1 from '../assets/emirest_house_images/pexels-binyaminmellish-186077.jpg'
import img2 from '../assets/emirest_house_images/pexels-binyaminmellish-1396122.jpg'

const Properties = () => {
  const [propertyList, setPropertyList] = useState([]);

  const images = [img1, img2];
  
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
            <div key={index} className='flex flex-row gap-20 border-gray-200 border-[1px]'>
              <img src={images[index]} className='h-[450px] w-[500px]'/>
              <div className='flex flex-col gap-2 p-4 justify-evenly'>
                <span>{prop.title}</span>
                <div>
                  <span>{prop.address.street}</span><br/>
                  <span>{prop.address.city} {prop.address.zip} {prop.address.country}</span>
                </div>
                <span>Available for: {prop.type}</span>
                <span>Price: {prop.price}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Properties