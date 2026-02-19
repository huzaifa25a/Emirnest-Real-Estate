import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import Search from '../components/Search'
import PropertyCard_Home from '../components/PropertyCard_Home'
import bg from '../assets/bg2.png'
import loader from '../assets/bouncing-circles.svg';

const Home = () => {
  const [propertyList, setPropertyList] = useState([]);
  const [Loader, setLoader] = useState(false);

  useEffect(() => {
    async function fetchProperties(){
      setLoader(true);
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/property/all_properties`);
      const properties = response.data;
      setPropertyList(properties);
      setLoader(false);
    }
    fetchProperties();
  }, []);

  const style = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <div className='flex flex-col flex-wrap'>
      <div className='bg-black/40 inset-0 h-[100vh]' style={style}>
        <Header/>
        <div className='flex flex-col gap-10 justify-center items-center mt-40 p-5'>
          <h2 className='font-bold text-[28px] text-white'>Find your dream property in the UAE</h2>
          <Search/>
        </div>
      </div>
      <div className='flex flex-col flex-wrap p-5 w-full items-center'>
        <h2 className='font-bold text-[26px] mb-4'>Featured Properties</h2>
        <div className='flex flex-row items-center justify-center flex-wrap gap-4'>
          {!Loader ?
              propertyList.slice(0, 4).map((property, index) => (
                <PropertyCard_Home key={index} property={property}/>
              ))
            :
            <span className='mt-10 flex flex-row justify-center gap-1 flex-wrap font-medium text-[20px]'>
              It may take some time to load. <span className='flex flex-row gap-1'>Please wait <img src={loader} className='h-10'/></span>
          </span>
          }
        </div>
      </div>
    </div>
  )
}

export default Home