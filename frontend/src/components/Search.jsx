import React from 'react'

const Search = () => {
  return (
    <div className='bg-white rounded-lg px-4 py-2'>
        <select className='rounded m-2 border-2 border-[#cdcdcd] py-2 px-4 focus:outline-none'>
            <option>Rent</option>
            <option>Buy</option>
        </select>
        <select className='rounded m-2 border-2 border-[#cdcdcd] py-2 px-4 focus:outline-none'>
            <option>Location</option>
            <option>Abu Dhabi</option>
            <option>Dubai</option>
            <option>Sharjah</option>
        </select>
        <select className='rounded m-2 border-2 border-[#cdcdcd] py-2 px-4 focus:outline-none'>
            <option>Property Type</option>
            <option>Studio</option>
            <option>Flat</option>
            <option>House</option>
        </select>
        <input
            className='rounded m-2 border-2 border-[#cdcdcd] py-2 px-4 focus:outline-none'
            type='text'
            placeholder='Search'
        />
        <button className='bg-[#096da7] rounded-md p-2 text-white hover:bg-[#204d67] transition-all duration-100'>Search</button>
    </div>
  )
}

export default Search