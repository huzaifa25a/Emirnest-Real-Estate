import React from "react";
import img1 from "../assets/emirest_house_images/pexels-binyaminmellish-186077.jpg";
import img2 from "../assets/emirest_house_images/pexels-binyaminmellish-1396122.jpg";
import img3 from "../assets/emirest_house_images/pexels-frans-van-heerden-201846-1438832.jpg";
import img4 from "../assets/emirest_house_images/pexels-luis-yanez-57302-206172.jpg";
import img5 from "../assets/emirest_house_images/pexels-pixabay-164522.jpg";
import img6 from "../assets/emirest_house_images/pexels-pixabay-164558.jpg";
import img7 from "../assets/emirest_house_images/pexels-pixabay-208736.jpg";
import img8 from "../assets/emirest_house_images/pexels-pixabay-209296.jpg";
import img9 from "../assets/emirest_house_images/pexels-pixabay-209315.jpg";
import img10 from "../assets/emirest_house_images/pexels-pixabay-221024.jpg";
import call from "../assets/telephone-fill.svg";
import email from "../assets/envelope-fill.svg";
import bedroom from "../assets/bedroom.svg";
import bathroom from "../assets/bathroom.svg";
import location from "../assets/location.svg";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

  const navigate = useNavigate();

  return (
    <div className="flex flex-row gap-5 border-gray-200 border-[1px] text-[18px] w-[890px]">
      <img
        src={images[1]}
        className="h-[300px] w-[350px] cursor-pointer"
        onClick={() => navigate(`/properties/${property.property_ID}`)}
      />
      <div className="flex flex-col gap-2 p-4 justify-evenly">
        <span>
          AED{" "}
          <span className="text-[34px]">
            {new Intl.NumberFormat("en-AE").format(property.price)}
          </span>{" "}
          {property.term}
        </span>
        <div className="flex flex-row gap-3">
          <span className="pr-2 border-r-2 border-gray-200">
            {property.type}
          </span>
          <span className="flex flex-row gap-3 pr-2 border-r-2 border-gray-200">
            <span className="flex flex-row gap-2 items-center">
              <img src={bedroom} className="h-[20px]" />
              {property.bedrooms}
            </span>
            <span className="flex flex-row gap-2 items-center">
              <img src={bathroom} className="h-[20px]" />
              {property.bathrooms}
            </span>
          </span>
          <span className="pr-2 border-r-2 border-gray-200">
            Area: {new Intl.NumberFormat("en-AE").format(property.area)}
            {property.areaUnit}
          </span>
          <span>Available for: {property.purpose}</span>
        </div>
        <div className="text-[20px] font-semibold">{property.title}</div>
        <div className="flex flex-row gap-2 items-center">
          <img src={location} className="h-[15px]" />
          <span>
            {property.address.street}, {property.address.city}
          </span>
          <br />
        </div>
        <div className="flex flex-row gap-5">
          <a
            href={`tel:${property.ownerPhone}`}
            className="flex flex-row gap-2 bg-[#a7dfff] hover:bg-[#87d3ff] p-2 rounded-lg text-[16px] w-[90px] justify-center"
          >
            <img src={call} className="h-[25px]" />
            Call
          </a>
          <a
            href={`mailto:${property.ownerEmail}`}
            className="flex flex-row gap-2 bg-[#a7dfff] hover:bg-[#87d3ff] p-2 rounded-lg text-[17px] w-[90px] justify-center"
          >
            <img src={email} className="h-[25px]" />
            Email
          </a>
          <button
            className="flex flex-row gap-2 bg-[#a7dfff] hover:bg-[#87d3ff] p-2 rounded-lg text-[17px] w-[130px] justify-center"
            onClick={() => navigate(`/properties/${property.property_ID}`)}
          >
            Find out more
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
