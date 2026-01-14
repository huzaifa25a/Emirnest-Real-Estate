import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../context/auth'

const Listproperty = () => {
  const[formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    street: "",
    city: "",
    zip: "",
    country: "",
    purpose: "",
    bedrooms: "", 
    bathrooms: "",
    area: "",
    imageURL: ""
  })
  
  const navigate = useNavigate();
  const {isLoggedIn} = useAuth();

  useEffect(() => {
    if(!isLoggedIn){
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const listingHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try{
      const newProperty = await axios.post(
        'http://localhost:3000/api/property/add_your_listing', 
        {
          title: formData.title,
          description: formData.description,
          price: formData.price,
          address: {
            street: formData.street,
            city: formData.city,
            zip: formData.zip,
            country: formData.country
          },
          type: formData.purpose,
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
          area: formData.area,
          imageURL: formData.imageURL 
        },
        {
          headers: { Authorization: `Bearer ${token}`, },
        });
        console.log(newProperty);
        navigate('/')
        console.log('listing submitted')
    }
    catch(error){
      console.log("error occured---->",error);
    }
  }

  return (
    <div className='gap-8 flex flex-col justify-center items-start w-full ml-[50px]'>
      <h2>List your property by filling out form below: </h2>
      <form onSubmit={listingHandler} 
       className='flex flex-col justify-center items-start gap-6 mt-[20px] max-w-[600px]'>
        <div className='flex flex-row gap-3'>
          <label htmlFor='title' className='min-w-[200px]'>Name of Property: </label>
          <input
            className='border-black border-[2px] rounded-md w-[368px] pl-2 p-0.5'
            type='text'
            name='title'
            value={formData.title} 
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex flex-row gap-3'>
          <label htmlFor='description' className='min-w-[200px]'>Description:</label>
          <textarea
            className='border-black border-[2px] rounded-md p-3'
            name='description'
            placeholder='More about your property...'
            value={formData.description} 
            onChange={handleChange}
            cols={44}
            rows={8}
          />
        </div>
        <div className='flex flex-row gap-3'>
          <label htmlFor='price' className='min-w-[200px]'>Price:</label>
          <input
            className='border-black border-[2px] rounded-md w-[368px] pl-2 p-0.5'
            type='number'
            name='price'
            value={formData.price} 
            onChange={handleChange} 
            required
            min={0}
          />
        </div>
        <div className='flex flex-row gap-3'>
          <label htmlFor='street' className='min-w-[200px]'>Street:</label>
          <input
            className='border-black border-[2px] rounded-md w-[368px] pl-2 p-0.5'
            type='text'
            name='street'
            value={formData.street} 
            onChange={handleChange} 
            required
          />
        </div>
        <div className='flex flex-row gap-3'>
          <label htmlFor='city' className='min-w-[200px]'>City:</label>
          <input
            className='border-black border-[2px] rounded-md w-[368px] pl-2 p-0.5'
            type='text'
            name='city'
            value={formData.city} 
            onChange={handleChange} 
            required
          />
        </div>
        <div className='flex flex-row gap-3'>
          <label htmlFor='zip' className='min-w-[200px]'>Zip:</label>
          <input
            className='border-black border-[2px] rounded-md w-[368px] pl-2 p-0.5'
            type='number'
            name='zip' 
            value={formData.zip} 
            onChange={handleChange}
            required
          />
        </div >
        <div className='flex flex-row gap-3'>
          <label htmlFor='country' className='min-w-[200px]'>Country:</label>
          <input
            className='border-black border-[2px] rounded-md w-[368px] pl-2 p-0.5'
            type='text'
            name='country' 
            value={formData.country} 
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex flex-row gap-3'>
          <label className='min-w-[200px]'>Purpose:</label>
            <div className='flex flex-row gap-3'>
              <label>
                <input
                  type="radio"
                  name="purpose"
                  value="rent"
                  checked={formData.purpose === "rent"}
                  onChange={handleChange}
                />
                Rent
              </label>
              <label>
                <input
                  type="radio"
                  name="purpose"
                  value="sale"
                  checked={formData.purpose === "sale"}
                  onChange={handleChange}
                />
                Sale
              </label>
            </div>
          </div>
        <div className='flex flex-row gap-3'>
          <label htmlFor='bedrooms' className='min-w-[200px]'>Bedrooms:</label>
          <input
            className='border-black border-[2px] rounded-md w-[368px] pl-2 p-0.5'
            type='number'
            name='bedrooms' 
            required
            value={formData.bedrooms} 
            onChange={handleChange}
            min={0}
          />
        </div>
        <div className='flex flex-row gap-3'>
          <label htmlFor='country' className='min-w-[200px]'>bathrooms:</label>
          <input
            className='border-black border-[2px] rounded-md w-[368px] pl-2 p-0.5'
            type='number'
            name='bathrooms' 
            required
            value={formData.bathrooms} 
            onChange={handleChange}
            min={0}
          />
        </div>
        <div className='flex flex-row gap-3'>
          <label htmlFor='area' className='min-w-[200px]'>Area:</label>
          <input
            className='border-black border-[2px] rounded-md w-[368px] pl-2 p-0.5'
            type='number'
            name='area'
            value={formData.area} 
            onChange={handleChange} 
            required
            min={0}
          />
        </div>
        <div className='flex flex-row gap-3'>
          <label htmlFor='image' className='min-w-[200px]'>Image Link:</label>
          <input
            className='border-black border-[2px] rounded-md w-[368px] pl-2 p-0.5'
            type='text'
            name='imageURL' 
            value={formData.imageURL} 
            onChange={handleChange}
          />
        </div>
        <div className='flex w-full justify-center'>
          <button 
            className='border-[2px] rounded-lg p-2 border-black'
            type='submit'
          >
            List your property
          </button>
        </div>
      </form>
    </div>
  )
}

export default Listproperty