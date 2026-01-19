import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import call from "../assets/telephone-fill.svg";
import email from "../assets/envelope-fill.svg";
import bedroom from "../assets/bedroom.svg";
import bathroom from "../assets/bathroom.svg";
import location from "../assets/location.svg";
import img from "../assets/emirest_house_images/pexels-pixabay-209315.jpg";

const PropertyPage = () => {
  const live = import.meta.env.VITE_API_BASE_URL;
  const local = 'http://localhost:3000';

  const { property_ID } = useParams();
  const [property, setProperty] = useState({});

  useEffect(() => {
    async function fetchProperty() {
      try {
        const result = await axios.get(
          `${live}/api/property/${property_ID}`
        );
        const propertyData = result.data;
        console.log(propertyData);
        setProperty(propertyData);
      } catch (error) {
        console.log("Error fetching proeprty data--->", error);
      }
    }
    fetchProperty();
  }, [property_ID]);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center text-[18px]">
        <img src={img} className="h-[100%] w-[55vw]" />
        <div className="flex flex-col w-[55vw] gap-10 items-start">
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-[24px]">
              AED{" "}
              <span className="font-bold text-[44px]">
                {new Intl.NumberFormat("en-AE").format(property.price)}
              </span>{" "}
              {property.term}
            </span>
            <div className="flex flex-row gap-2 items-center">
              <img src={location} className="h-[15px]" />
              {property.address ? (
                <span>
                  {property.address.street}, {property.address.city}
                </span>
              ) : null}
            </div>
            <div className="flex flex-row gap-3">
              <span className="flex flex-row gap-3 pr-2 border-r-2 border-gray-200">
                <span className="flex flex-row gap-2 items-center">
                  <img src={bedroom} className="h-[20px]" />
                  {property.bedrooms} Beds
                </span>
                <span className="flex flex-row gap-2 items-center">
                  <img src={bathroom} className="h-[20px]" />
                  {property.bathrooms} Baths
                </span>
              </span>
              <span className="pr-2 border-r-2 border-gray-200">
                Area: {new Intl.NumberFormat("en-AE").format(property.area)}{" "}
                {property.areaUnit}
              </span>
            </div>
          </div>
          {/*Title and Description */}
          <div>
            <h2 className="text-[28px] font-medium">{property.title}</h2>
            <span>{property.description}</span>
          </div>
          {/*Property Info  */}
          <div className="flex gap-5 flex-col">
            <h2 className="text-[20px] font-semibold">Property Information</h2>
            <div className="flex flex-row justify-start gap-48 w-[55vw]">
              <div className="flex flex-col gap-3">
                <span className="flex flex-row border-b-2 border-gray-100 pb-2">
                  <div className="w-[150px]">
                    <span>Type:</span>
                  </div>
                  <span className="font-semibold">{property.type}</span>
                </span>
                <span className="flex flex-row border-b-2 border-gray-100">
                  <div className="w-[150px]">
                    <span>Usage:</span>
                  </div>
                  <span className="font-semibold">{property.usage}</span>
                </span>
                <span className="flex flex-row border-b-2 border-gray-100">
                  <div className="w-[150px]">
                    <span>Available for:</span>
                  </div>
                  <span className="font-semibold">{property.purpose}</span>
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="flex flex-row border-b-2 border-gray-100">
                  <div className="w-[150px]">
                    <span>Furnishing:</span>
                  </div>
                  <span className="font-semibold">{property.furnishing}</span>
                </span>
                <span className="flex flex-row border-b-2 border-gray-100">
                  <div className="w-[150px]">
                    <span>Parking:</span>
                  </div>
                  <span className="font-semibold">{property.parking}</span>
                </span>
                <span className="flex flex-row border-b-2 border-gray-100">
                  <div className="w-[150px]">
                    <span>Listed on:</span>
                  </div>
                  <span className="font-semibold">{property.date}</span>
                </span>
              </div>
            </div>
          </div>
          {/*Owner and Listed By Info  */}
          <div className="flex flex-row gap-24 w-[55vw]">
            <div className="flex gap-5 flex-col">
              <h2 className="text-[20px] font-semibold">Owner Information</h2>
              <div className="flex flex-col gap-5 justify-center items-start">
                <span>
                  Name: {property.listedBy ? property.listedBy.name : ""}
                </span>
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
                </div>
              </div>
            </div>
            <div className="flex gap-5 flex-col">
              <h2 className="text-[20px] font-semibold">Listed By</h2>
              <div className="flex flex-col gap-5 justify-center items-start">
                <span>
                  Name: {property.listedBy ? property.listedBy.name : ""}
                </span>
                <div className="flex flex-row gap-5">
                  <a
                    href={`tel:${property.ownerPhone}`}
                    className="flex flex-row gap-2 bg-[#a7dfff] hover:bg-[#87d3ff] p-2 rounded-lg text-[16px] w-[90px] justify-center"
                  >
                    <img src={call} className="h-[25px]" />
                    Call
                  </a>
                  <a
                    href={`mailto:${
                      property.listedBy ? property.listedBy.email : ""
                    }`}
                    className="flex flex-row gap-2 bg-[#a7dfff] hover:bg-[#87d3ff] p-2 rounded-lg text-[17px] w-[90px] justify-center"
                  >
                    <img src={email} className="h-[25px]" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyPage;
