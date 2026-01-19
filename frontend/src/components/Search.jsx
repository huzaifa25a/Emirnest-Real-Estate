import React, { useState } from "react";
import Properties from "../pages/Properties";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [purpose, setPurpose] = useState('');
  const [type, setType] = useState('')
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  function searchHandler(){
    if(purpose === '' && type === '' && location === ''){
        return;
    }
    console.log('HEREEEEEEEEEEE');
    navigate(`/properties/search?purpose=${purpose && purpose !== 'Purpose' ? purpose : null}&type=${type && type !== 'Property Type' ? type : null}&location=${location && location !== 'Location' ? location : null}`)
  }

  return (
    <div className="bg-white rounded-lg px-4 py-2">
      <select 
        className="rounded m-2 border-2 border-[#cdcdcd] py-2 px-4 focus:outline-none"
        name="purpose"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
      >
        <option value=''>Purpose</option>
        <option value='Rent'>Rent</option>
        <option value='Sale'>Buy</option>
      </select>
      <select 
        className="rounded m-2 border-2 border-[#cdcdcd] py-2 px-4 focus:outline-none"
        name="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value=''>Location</option>
        <option value='Abu Dhabi'>Abu Dhabi</option>
        <option value='Dubai'>Dubai</option>
        <option value='Sharjah'>Sharjah</option>
        <option value='Ajman'>Ajman</option>
        <option value='Ras Al Khaimah'>Ras Al Khaimah</option>
        <option value='Fujairah'>Fujairah</option>
        <option value='Umm Al Quwain'>Umm Al Quwain</option>
      </select>
      <select 
        className="rounded m-2 border-2 border-[#cdcdcd] py-2 px-4 focus:outline-none"
        name="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value=''>Property Type</option>
        <option value='Studio'>Studio</option>
        <option value='Flat'>Flat</option>
        <option value='House'>House</option>
      </select>
      <input
        className="rounded m-2 border-2 border-[#cdcdcd] py-2 px-4 focus:outline-none"
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="bg-[#096da7] rounded-md p-2 text-white hover:bg-[#204d67] transition-all duration-100"
        onClick={searchHandler}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
