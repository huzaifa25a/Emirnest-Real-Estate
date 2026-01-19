import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import PropertyCard from '../components/PropertyCard'
import { useSearchParams } from 'react-router-dom'

const Properties = () => {
  const [propertyList, setPropertyList] = useState([]);
  const [searchParams] = useSearchParams();

  const purpose = searchParams.get('purpose');
  const location = searchParams.get('location');
  const type = searchParams.get('type');
 
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
        {!searchParams.has('purpose') ? 
          <h2 className='font-semibold text-[28px] mb-10'>All properties available for rent or sale</h2>
        :
          <h2 className='font-semibold text-[28px] mb-10'>Properties available for your search</h2>
        }
        <div className='flex flex-col gap-10'>
          {propertyList && !searchParams.has('purpose') ?
              propertyList.map((property, index) => (
                <PropertyCard key={index} property= {property}/>
              ))
              :
            purpose !== 'null'  && type === 'null' && location ==='null' ?  /*filter if only purpose is present*/
              propertyList.filter(property => 
                ((property.purpose === purpose)) 
              ).map((property, index) => (
                <PropertyCard key={index} property= {property}/>
              ))
              :
            purpose === 'null'  && type !== 'null' && location ==='null' ?  /*filter if only type is present*/
              propertyList.filter(property => 
                ((property.type === type)) 
              ).map((property, index) => (
                <PropertyCard key={index} property= {property}/>
              ))
              :
            purpose === 'null'  && type === 'null' && location !=='null' ?  /*filter if only location is present*/
              propertyList.filter(property => 
                ((property.address.city.toLowerCase() === location.toLowerCase())) 
              ).map((property, index) => (
                <PropertyCard key={index} property= {property}/>
              ))
              :
            purpose !== 'null'  && type !== 'null' && location ==='null' ?  /*filter if only purpose and type is present*/
              propertyList.filter(property => 
                ((property.purpose === purpose && property.type === type)) 
              ).map((property, index) => (
                <PropertyCard key={index} property= {property}/>
              ))
              :
            purpose !== 'null'  && type === 'null' && location !=='null' ?  /*filter if only purpose and location is present*/
              propertyList.filter(property => 
                ((property.purpose === purpose && property.address.city.toLowerCase() === location.toLowerCase())) 
              ).map((property, index) => (
                <PropertyCard key={index} property= {property}/>
              ))
              :
            purpose === 'null'  && type !== 'null' && location !=='null' ?  /*filter if only type and location is present*/
              propertyList.filter(property => 
                ((property.type === type && property.address.city.toLowerCase() === location.toLowerCase())) 
              ).map((property, index) => (
                <PropertyCard key={index} property= {property}/>
              ))
              :
            purpose !== 'null'  && type !== 'null' && location !=='null' ?  /*filter if all values are present*/
              propertyList.filter(property => 
                ((property.purpose === purpose && property.type === type && property.address.city.toLowerCase() === location.toLowerCase())) 
              ).map((property, index) => (
                <PropertyCard key={index} property= {property}/>
              ))
              :
            null
          }
        </div>
      </div>
    </>
  )
}

export default Properties