import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import img from "../assets/emirest_house_images/pexels-binyaminmellish-1396122.jpg";
import location from "../assets/location.svg";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import visit from "../assets/visit.svg";
import date from "../assets/date.svg";
import bath from "../assets/bathroom.svg";
import bed from "../assets/bedroom.svg";

const MyListings = () => {
  const live = import.meta.env.VITE_API_BASE_URL;
//   const live = "http://localhost:3000";
  const [listings, setListings] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [id, setId] = useState("");

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
    async function fetchListing() {
      try {
        const result = await axios.get(`${live}/api/property/my_listings`, {
          params: { token: token },
        });
        if (!result) {
          return setShowMessage(true);
        }
        setShowMessage(false);
        setListings(result.data);
      } catch (err) {
        console.log("Error occured --->", err);
      }
    }

    fetchListing();
  }, []);

  const deleteProperty = async (ID) => {
    try {
      const response = await axios.delete(
        `${live}/api/property/delete_property`,
        {
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

  return (
    <>
      <div
        className={`${
          showPopup ? "blur-sm pointer-events-none select-none" : ""
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
                        <button onClick={() => navigate(`properties/${listing.property_ID}`)} className="w-[128px] py-2 px-3 bg-[#56b259] hover:bg-[#29972c] shadow-sm hover:shadow-md transition-all duration-200">
                          <div className="flex flex-row justify-center items-center gap-1">
                            <span className="text-white">
                              View
                            </span>
                            <img src={visit} className="h-4" />
                          </div>
                        </button>
                        <button className="w-[128px] py-2 px-3 bg-[#096da7] hover:bg-[#204d67] shadow-sm hover:shadow-md transition-all duration-200">
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
        ) : (
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
                onClick={() => deleteProperty(id)}
              >
                Confirm
              </button>
              <button
                className="w-20 text-white rounded-md p-2 border-gray-200 border-[1px] shadow-sm bg-[#e34c4c] hover:bg-[#942b2b]"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyListings;
