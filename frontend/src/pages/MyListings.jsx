import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {useAuth} from '../context/auth'
import img from "../assets/emirest_house_images/pexels-binyaminmellish-1396122.jpg";
import location from "../assets/location.svg";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import visit from "../assets/visit.svg";
import date from "../assets/date.svg";
import bath from "../assets/bathroom.svg";
import bed from "../assets/bedroom.svg";
import loader from '../assets/bouncing-circles.svg';

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [id, setId] = useState("");
  const [showPropertyDetailsPopup, setShowPropertyDetailsPopup] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    term: "",
    type: "",
    usage: "",
    purpose: "",
    property_name: "",
    street: "",
    city: "",
    zip: "",
    country: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    areaUnit: "",
    furnishing: "",
    parking: "",
    ownerPhone: "",
    ownerEmail: "",
    imageURL: "",
  });

  const {logout} = useAuth();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => (document.body.style.overflow = "auto");
  }, [showPopup]);

  useEffect(() => {
    const checkAuth = async () => {
      try{
        await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/checkAuth`,{
          headers: {Authorization: `Bearer ${token}`}
        });
      }
      catch(err){
        logout();
        navigate('/login');
      }
    }

    async function fetchListing() {
      try {
        setLoader(true);
        const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/property/my_listings`, {
          headers: {Authorization: `Bearer ${token}`},
          params: { token: token },
        });
        if (result.data.length === 0) {
          setLoader(false);
          return setShowMessage(true);
        }
        setLoader(false);
        setShowMessage(false);
        setListings(result.data);
      } catch (err) {
        console.log("Error occured --->", err);
      }
    }

    checkAuth();
    fetchListing();
  }, []);

  const deleteProperty = async (ID) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/property/delete_property`,
        {
          headers: {Authorization: `Bearer ${token}`},
          params: { id: ID },
        }
      );
      setShowPopup(false);
      window.location.reload();
      console.log("Deleted");
    } catch (err) {
      console.log("Error deleting --->", err);
    }
  };

  const editListingHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    const token = localStorage.getItem("token");
    try {
      const updateProperty = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/property/edit_listing/${id}`,
        {
          title: formData.title,
          description: formData.description,
          price: formData.price,
          term: formData.term,
          type: formData.type,
          usage: formData.usage,
          purpose: formData.purpose,
          address: {
            property_name: formData.property_name,
            street: formData.street,
            city: formData.city,
            zip: formData.zip,
            country: formData.country,
          },
          type: formData.type,
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
          area: formData.area,
          areaUnit: formData.areaUnit,
          furnishing: formData.furnishing,
          parking: formData.parking,
          date: formData.newDate,
          ownerPhone: formData.ownerPhone,
          ownerEmail: formData.ownerEmail,
          imageURL: formData.imageURL,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setId('');
      setShowPropertyDetailsPopup(false);
      console.log(updateProperty);
      console.log("listing submitted");
    } catch (error) {
      console.log("error occured---->", error);
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div
        className={`${
          showPopup || showPropertyDetailsPopup ? "pointer-events-none select-none" : ""
        }`}
      >
        <Header />
        {!showMessage ? (
          <div className="flex flex-col items-center w-full p-4 gap-16">
            <h2 className="text-[28px] font-bold">Your Listings</h2>
            <div className="flex flex-row flex-wrap justify-center gap-10">
              {listings.map((listing, index) => (
                <div
                  key={index}
                  className="flex flex-col border-gray-200 border-2 gap-3"
                >
                  <img src={img} className="h-[284px] w-[384px]" />
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2 p-2">
                      <span className="font-bold">{listing.title}</span>
                      <div className="flex flex-row justify-between">
                        <span className="flex gap-1 items-center max-w-[208px]">
                          <img src={location} className="h-4 mb-6" />
                          <div className="flex flex-col">
                            <span className="max-w-[140px] truncate">
                              {listing.address.street},
                            </span>
                            {listing.address.city}
                          </div>
                        </span>
                        <span>Listed on: {listing.date}</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-row justify-center border-t-[1px] border-gray-300">
                        <span className="p-2 flex flex-row gap-2 justify-center items-center w-[128px] bg-gray-100 border-r-[1px] border-gray-300">
                          <img src={bath} className="h-6" />
                          {listing.bathrooms}
                        </span>
                        <span className="p-2 flex flex-row gap-3 justify-center items-center w-[128px] bg-gray-100 border-r-[1px] border-gray-300">
                          <img src={bed} className="h-6" />
                          {listing.bedrooms}
                        </span>
                        <span className="flex justify-center items-center w-[128px] bg-gray-100">
                          {new Intl.NumberFormat("en-AE").format(listing.area)}{" "}
                          {listing.areaUnit}
                        </span>
                      </div>
                      <div className="flex flex-row">
                        <button onClick={() => navigate(`/properties/${listing.property_ID}`)} className="w-[128px] py-2 px-3 bg-[#56b259] hover:bg-[#29972c] shadow-sm hover:shadow-md transition-all duration-200">
                          <div className="flex flex-row justify-center items-center gap-1">
                            <span className="text-white">
                              View
                            </span>
                            <img src={visit} className="h-4" />
                          </div>
                        </button>
                        <button 
                          className="w-[128px] py-2 px-3 bg-[#096da7] hover:bg-[#204d67] shadow-sm hover:shadow-md transition-all duration-200"
                          onClick={() => {
                            setId(listing._id),
                            setFormData({
                              title: listing.title,
                              description: listing.description,
                              price: listing.price,
                              term: listing.term,
                              type: listing.type,
                              usage: listing.usage,
                              purpose: listing.purpose,
                              property_name: listing.address.property_name,
                              street: listing.address.street,
                              city: listing.address.city,
                              zip: listing.address.zip,
                              country: listing.address.country,
                              bedrooms: listing.bedrooms,
                              bathrooms: listing.bathrooms,
                              area: listing.area,
                              areaUnit: listing.areaUnit,
                              furnishing: listing.furnishing,
                              parking: listing.parking,
                              ownerPhone: listing.ownerPhone,
                              ownerEmail: listing.ownerEmail,
                              imageURL: listing.imageURL,
                            }),
                            setShowPropertyDetailsPopup(true)
                          }}
                        >
                          <div className="flex flex-row justify-center items-center gap-1">
                            <span className="text-white">Edit Details</span>
                            <img src={edit} className="h-4" />
                          </div>
                        </button>
                        <button
                          className="w-[128px] py-2 px-3 bg-[#e34c4c] hover:bg-[#942b2b] shadow-sm hover:shadow-md transition-all duration-200"
                          onClick={() => {
                            setId(listing._id), setShowPopup(true);
                          }}
                        >
                          <div className="flex flex-row justify-center items-center gap-1">
                            <span className="text-white">Delete</span>
                            <img src={trash} className="h-4" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : showMessage && (
          <div className="flex flex-col items-center gap-5">
            <h2 className="text-[28px]">You have not listed any properties</h2>
            <NavLink
              to="/list_property"
              onClick={() => setMenuOpen(false)}
              className="block bg-[#096da7] text-white text-center px-2 py-2 rounded-md text-[18px]"
            >
              Add your property
            </NavLink>
          </div>
        )}
      </div>
      {showPopup && (
        <div className="fixed flex items-center justify-center inset-0 z-[999] bg-black/70 backdrop-blur-sm">
          <div className="flex flex-col justify-center items-center rounded-lg shadow-lg p-4 gap-8 bg-white border-gray-200 border-2 w-[350px]">
            <span>Are you sure you want to delete this listing?</span>
            <div className="flex flex-row gap-3">
              <button
                className="w-20 rounded-md p-2 border-gray-200 border-[1px] shadow-sm hover:bg-gray-100"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="w-20 text-white rounded-md p-2 border-gray-200 border-[1px] shadow-sm bg-[#e34c4c] hover:bg-[#942b2b]"
                onClick={() => deleteProperty(id)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {Loader && (
        <span className='mt-10 flex flex-row justify-center gap-1 flex-wrap font-medium text-[20px]'>
            It may take some time to load. <span className='flex flex-row gap-1'>Please wait <img src={loader} className='h-10'/></span>
        </span>
      )}
      {/* UPDATE PROPERTY DETAILS*/}
      {showPropertyDetailsPopup && (
        <div className="fixed overflow-auto pt-[600px] pb-10 z-[999] inset-0 backdrop-blur-sm bg-black/70 flex justify-center items-center">
          <div className="p-4 border-gray-200 border-[2px] shadow-md rounded-md bg-white flex flex-col justify-center items-center w-auto ml-[50px]">
            <h2 className="text-[28px] font-semibold">
              Update Property Details
            </h2>
            <form
              onSubmit={editListingHandler}
              className="p-8 flex flex-col justify-center items-start gap-6 mt-[20px] w-auto text-[18px]"
            >
              {/*Headline*/}
              <div className="flex flex-row gap-3 flex-wrap">
                <label htmlFor="title" className="min-w-[150px]">
                  Headline:{" "}
                </label>
                <input
                  className="rounded-md sm:w-[872px] pl-2 p-0.5 border-[1px] border-gray-400 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
    
              {/*Description*/}
              <div className="flex flex-row gap-3">
                <label htmlFor="description" className="min-w-[150px]">
                  Description:
                </label>
                <textarea
                  className="rounded-md p-3 sm:w-[872px] pl-2 border-[1px] border-gray-400 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg"
                  name="description"
                  placeholder="More about your property..."
                  value={formData.description}
                  onChange={handleChange}
                  cols={44}
                  rows={8}
                />
              </div>
    
              {/*Purpose and Price */}
              <div className="flex flex-row gap-20">
                <div className="flex flex-row gap-3">
                  <label className="min-w-[150px]">Purpose:</label>
                  <div className="flex flex-row gap-3 w-[315px]">
                    <label>
                      <input
                        type="radio"
                        name="purpose"
                        value="Rent"
                        checked={formData.purpose === "Rent"}
                        onChange={handleChange}
                        required
                      />
                      Rent
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="purpose"
                        value="Sale"
                        checked={formData.purpose === "Sale"}
                        onChange={handleChange}
                        requied
                      />
                      Sale
                    </label>
                  </div>
                </div>
                <div className="flex flex-row gap-3">
                  <label htmlFor="price" className="min-w-[150px]">
                    Price (AED):
                  </label>
                  <input
                    className="w-[315px] pl-2 p-0.5 rounded-md border-[1px] border-gray-400 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min={0}
                  />
                </div>
              </div>
    
              {/*term and type */}
              <div className="flex flex-row gap-20">
                <div className="flex flex-row gap-3">
                  <label className="min-w-[150px]">Term:</label>
                  <div className="flex flex-row gap-3 w-[315px]">
                    <label>
                      <input
                        type="radio"
                        name="term"
                        value="Monthly"
                        checked={formData.term === "Monthly"}
                        onChange={handleChange}
                        required
                      />
                      Monthly
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="term"
                        value="Yearly"
                        checked={formData.term === "Yearly"}
                        onChange={handleChange}
                        required
                      />
                      Yearly
                    </label>
                  </div>
                </div>
                <div className="flex flex-row gap-3">
                  <label className="min-w-[150px]">Type:</label>
                  <div className="flex flex-row gap-3">
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="Studio"
                        checked={formData.type === "Studio"}
                        onChange={handleChange}
                        required
                      />
                      Studio
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="Flat"
                        checked={formData.type === "Flat"}
                        onChange={handleChange}
                        required
                      />
                      Flat
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="House"
                        checked={formData.type === "House"}
                        onChange={handleChange}
                        required
                      />
                      House
                    </label>
                  </div>
                </div>
              </div>
    
              {/*usage and furnishing */}
              <div className="flex flex-row gap-20">
                <div className="flex flex-row gap-3">
                  <label className="min-w-[150px]">Usage:</label>
                  <div className="flex flex-row gap-3 w-[315px]">
                    <label>
                      <input
                        type="radio"
                        name="usage"
                        value="Residential"
                        checked={formData.usage === "Residential"}
                        onChange={handleChange}
                        required
                      />
                      Residential
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="usage"
                        value="Commercial"
                        checked={formData.usage === "Commercial"}
                        onChange={handleChange}
                        required
                      />
                      Commercial
                    </label>
                  </div>
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <label className="min-w-[150px]">Furnishing status:</label>
                  <select
                    name="furnishing"
                    value={formData.furnishing}
                    onChange={handleChange}
                    className="w-[315px] pl-2 p-0.5 rounded-md border-[1px] border-gray-400 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg"
                    required
                  >
                    <option value="">Select furnishing</option>
                    <option value="Furnished">Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                    <option value="Partially-furnished">Partially-furnished</option>
                  </select>
                </div>
              </div>
    
              {/*bedroom and bathroom */}
              <div className="flex flex-row gap-20">
                <div className="flex flex-row gap-3">
                  <label htmlFor="bedrooms" className="min-w-[150px]">
                    Bedrooms:
                  </label>
                  <input
                    className="w-[315px] pl-2 p-0.5 rounded-md border-[1px] border-gray-400 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg"
                    type="number"
                    name="bedrooms"
                    required
                    value={formData.bedrooms}
                    onChange={handleChange}
                    min={0}
                  />
                </div>
                <div className="flex flex-row gap-3">
                  <label htmlFor="country" className="min-w-[150px]">
                    bathrooms:
                  </label>
                  <input
                    className="w-[315px] pl-2 p-0.5 rounded-md border-[1px] border-gray-400 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg"
                    type="number"
                    name="bathrooms"
                    required
                    value={formData.bathrooms}
                    onChange={handleChange}
                    min={0}
                  />
                </div>
              </div>
    
              {/*Area and Area unit */}
              <div className="flex flex-row gap-20">
                <div className="flex flex-row gap-3">
                  <label htmlFor="area" className="min-w-[150px]">
                    Area:
                  </label>
                  <input
                    className="w-[315px] pl-2 p-0.5 rounded-md border-[1px] border-gray-400 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg"
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    required
                    min={0}
                  />
                </div>
                <div className="flex flex-row gap-3">
                  <label className="min-w-[150px]">Area unit:</label>
                  <div className="flex flex-row gap-3">
                    <label>
                      <input
                        type="radio"
                        name="areaUnit"
                        value="sqft"
                        checked={formData.areaUnit === "sqft"}
                        onChange={handleChange}
                        required
                      />
                      sqft
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="areaUnit"
                        value="Sq. M."
                        checked={formData.areaUnit === "Sq. M."}
                        onChange={handleChange}
                        required
                      />
                      Sq. M.
                    </label>
                  </div>
                </div>
              </div>
    
              {/*building name and street*/}
              <div className="flex flex-row gap-20">
                <div className="flex flex-row gap-3">
                  {" "}
                  {/*Name of Property Here*/}
                  <label htmlFor="property_name" className="max-w-[150px]">
                    House Name/No. :
                  </label>
                  <input
                    className="rounded-md w-[315px] pl-2 p-0.5 border-[1px] border-gray-400 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg"
                    type="text"
                    name="property_name"
                    value={formData.property_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-row gap-3">
                  <label htmlFor="street" className="min-w-[150px]">
                    Street:
                  </label>
                  <input
                    className="w-[315px] pl-2 p-0.5 rounded-md border-[1px] border-gray-400 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg"
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
    
              {/*city and zip */}
              <div className="flex flex-row gap-20">
                <div className="flex flex-row gap-3">
                  <label htmlFor="city" className="min-w-[150px]">
                    City:
                  </label>
                  <input
                    className="w-[315px] pl-2 p-0.5 rounded-md border-[1px] border-gray-400 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-row gap-3">
                  <label htmlFor="zip" className="min-w-[150px]">
                    Zip:
                  </label>
                  <input
                    className="w-[315px] pl-2 p-0.5 rounded-md border-[1px] border-gray-400 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg"
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
    
              {/*country and parking */}
              <div className="flex flex-row gap-20">
                <div className="flex flex-row gap-3">
                  <label htmlFor="country" className="min-w-[150px]">
                    Country:
                  </label>
                  <input
                    className="w-[315px] pl-2 p-0.5 rounded-md border-[1px] border-gray-400 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg"
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-row gap-3">
                  <label className="min-w-[150px]">Parking:</label>
                  <div className="flex flex-row gap-3">
                    <label>
                      <input
                        type="radio"
                        name="parking"
                        value="Yes"
                        checked={formData.parking === "Yes"}
                        onChange={handleChange}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="parking"
                        value="No"
                        checked={formData.parking === "No"}
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>
    
              {/*email and phone */}
              <div className="flex flex-row gap-20">
                <div className="flex flex-row gap-3">
                  <label htmlFor="ownerPhone" className="min-w-[150px]">
                    Owner Phone:
                  </label>
                  <input
                    className="w-[315px] pl-2 p-0.5 rounded-md border-[1px] border-gray-400 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg"
                    type="tel"
                    name="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-row gap-3">
                  <label htmlFor="ownerEmail" className="min-w-[150px]">
                    Owner Email:
                  </label>
                  <input
                    className="w-[315px] pl-2 p-0.5 rounded-md border-[1px] border-gray-400 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg"
                    type="email"
                    name="ownerEmail"
                    value={formData.ownerEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>
    
              {/*Image Link*/}
              <div className="flex flex-row gap-3">
                <label htmlFor="image" className="min-w-[150px]">
                  Image Link:
                </label>
                <input
                  className="sm:w-[872px] pl-2 p-0.5 rounded-md border-[1px] border-gray-400 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg"
                  type="url"
                  name="imageURL"
                  value={formData.imageURL}
                  onChange={handleChange}
                />
              </div>
    
              <div className="flex w-full gap-5 justify-center">
                <button
                  className="text-black border-[2px] rounded-lg bg-[#ffff] shadow-md p-2 w-[150px] hover:bg-gray-10  0  transition-all duration-100"
                  onClick={() => setShowPropertyDetailsPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="border-[2px] rounded-lg bg-[#096da7] shadow-md text-white p-2 w-[150px] hover:bg-[#204d67]  transition-all duration-100"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MyListings;
