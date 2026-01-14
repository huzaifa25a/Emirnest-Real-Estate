import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Properties = () => {
  const [propertyList, setPropertyList] = useState([]);

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
    <div className='flex flex-col p-10'>
      <div className='flex flex-row gap-10'>
        {propertyList && 
          propertyList.map((prop, index) => (
            <div key={index} className='flex flex-col gap-2'>
              <img src={prop.imageURL}/>
              <span>{prop.title}</span>
              <div>
                <span>{prop.address.street}</span><br/>
                <span>{prop.address.city} {prop.address.zip} {prop.address.country}</span>
              </div>
              <span>Available for: {prop.type}</span>
              <span>Price: {prop.price}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Properties