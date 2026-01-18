import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import Search from '../components/Search'
import PropertyCard_Home from '../components/PropertyCard_Home'
import bg from '../assets/bg2.png'

const Home = () => {
  const [propertyList, setPropertyList] = useState([]);

  useEffect(() => {
    async function fetchProperties(){
      const response = await axios.get('http://localhost:3000/api/property/all_properties');
      const properties = response.data;
      setPropertyList(properties);
    }
    fetchProperties();
  }, []);

  const style = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <div className='flex flex-col'>
      <div className='bg-black/40 inset-0 h-[100vh]' style={style}>
        <Header/>
        <div className='flex flex-col gap-10 justify-center items-center mt-40'>
          <h2 className='font-bold text-[28px] text-white'>Find your dream property in the UAE</h2>
          <Search/>
        </div>
      </div>
      <div className='flex flex-col p-5 w-full items-center'>
        <h2 className='font-bold text-[26px] mb-4'>Featured Properties</h2>
        <div className='flex flex-row gap-4'>
          {propertyList &&
              propertyList.slice(0, 4).map((property, index) => (
                <PropertyCard_Home key={index} property={property}/>
              ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home