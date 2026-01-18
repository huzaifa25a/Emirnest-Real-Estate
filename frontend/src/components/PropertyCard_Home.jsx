import React from "react";
import img1 from "../assets/emirest_house_images/pexels-binyaminmellish-186077.jpg";
import img2 from "../assets/emirest_house_images/pexels-binyaminmellish-1396122.jpg";
import img3 from "../assets/emirest_house_images/pexels-frans-van-heerden-201846-1438832.jpg";
import img4 from "../assets/emirest_house_images/pexels-luis-yanez-57302-206172.jpg";
import location from "../assets/location.svg";
import { useNavigate } from "react-router-dom";


const PropertyCard_Home = ({ property }) => {
  const images = [img1, img2, img3, img4];

  const style = {
    backgroundImage: `url(${images[1]})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center border-gray-200 border-[1px] min-w-[350px]">
      <div className="h-[200px] w-[350px]" style={style}>
        <div className="p-2">
          <span className="text-white bg-[#096da7] p-2 rounded-md">AED <span className="text-[20px] text-white">{property.price}/</span>{property.term}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4 justify-evenly">
        <div className="text-[16px] font-semibold w-full text-center">{property.title}</div>
        <div className="flex flex-row gap-3">
          <span className="pr-2 border-r-2 border-gray-200">
            {property.type}
          </span>
          <span className="flex flex-row gap-3 pr-2 border-r-2 border-gray-200">
            <span className="gap-2">Beds: {property.bedrooms}</span>
            <span className="gap-2">Baths: {property.bathrooms}</span>
          </span>
          <span className="pr-2 border-r-2 border-gray-200">
            {property.area} {property.areaUnit}
          </span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <img src={location} className="h-[15px]" />
          <span>{property.address.street}, {property.address.city}</span>
        </div>
        <div className="w-full flex items-center justify-center mt-4">
          <button className='rounded-lg bg-[#096da7] shadow-md text-white p-2 w-[120px] hover:bg-[#204d67]  transition-all duration-100' onClick={() => navigate(`/properties/${property.property_ID}`)}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard_Home;
