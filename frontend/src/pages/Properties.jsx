import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import PropertyCard from '../components/PropertyCard'

const Properties = () => {
  const [propertyList, setPropertyList] = useState([]);
 
  useEffect(() => {
    async function fetchProperties(){
      const response = await axios.get('http://localhost:3000/api/property/all_properties');
      const properties = response.data;
      setPropertyList(properties);
      console.log(propertyList);
    }
    fetchProperties();
  }, []);

  return (
    <>
      <Header/>
      <div className='flex flex-col p-10 justify-center items-center'>
        <h2 className='font-bold text-[24px] mb-10'>Properties available for rent or sale</h2>
        <div className='flex flex-col gap-10'>
          {propertyList &&
              propertyList.map((property, index) => (
                <PropertyCard key={index} property= {property}/>
              ))
          }
        </div>
      </div>
    </>
  )
}

export default Properties