import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import Header from "../components/Header";

const Listproperty = () => {
  const live = import.meta.env.VITE_API_BASE_URL;
  // const live = 'http://localhost:3000';

  function generatePropertyID() {
    const id = Math.floor(Math.random() * 90000) + 10000;
    const property_id = "property-" + id;
    return property_id;
  }

  const [formData, setFormData] = useState({
    property_ID: generatePropertyID(),
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
    purpose: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    areaUnit: "",
    furnishing: "",
    parking: "",
    newDate: new Date().toLocaleDateString(),
    ownerPhone: "",
    ownerEmail: "",
    imageURL: "",
  });

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const listingHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    const token = localStorage.getItem("token");
    try {
      const newProperty = await axios.post(
        `${live}/api/property/add_your_listing`,
        {
          property_ID: formData.property_ID,
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
      console.log(newProperty);
      navigate("/");
      console.log("listing submitted");
    } catch (error) {
      console.log("error occured---->", error);
    }
  };

  return (
    <>
      <Header />
      <div className="gap-6 flex flex-col justify-center items-center w-auto ml-[50px]">
        <h2 className="text-[28px] font-semibold">
          List your property by filling out form below:
        </h2>
        <form
          onSubmit={listingHandler}
          className="p-8 flex flex-col justify-center items-start gap-6 mt-[20px] w-auto text-[18px] border-gray-200 border-[2px] shadow-md"
        >
          {/*Headline*/}
          <div className="flex flex-row gap-3">
            <label htmlFor="title" className="min-w-[150px]">
              Headline:{" "}
            </label>
            <input
              className="rounded-md w-[872px]  pl-2 p-0.5 border-[1px] border-gray-400 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg"
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
              className="rounded-md p-3 w-[872px] pl-2 border-[1px] border-gray-400 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg"
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
                    name="term"
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
              className="w-[872px] pl-2 p-0.5 rounded-md border-[1px] border-gray-400 focus:border-[#096da7] focus:border-[2px] focus:outline-none focus:shadow-lg"
              type="url"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
            />
          </div>

          <div className="flex w-full justify-center">
            <button
              className="border-[2px] rounded-lg bg-[#096da7] shadow-md text-white p-2 w-[150px] hover:bg-[#204d67]  transition-all duration-100"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Listproperty;
