const express = require("express");
const protect = require('../middleware/authMiddleware');
const property = require('../models/property');

const router = express.Router();

router.get('/all_properties', async (req, res) => {
   try{
    const properties = await property.find().sort({createdAt: -1})
    res.json(properties);
   }
   catch(err){
    console.error("error fetching properties--->", err);
   }
})

router.post('/add_your_listing', protect, async (req, res) => {
   try{
    const {property_name, title, description, price, term, type, usage, purpose, address, bedrooms, bathrooms, area, areaUnit, furnishing, parking, date, ownerPhone, ownerEmail, imageURL} = req.body;
   
    const newProperty = await property.create({
        property_name,
        title,
        description,
        price,
        term,
        type,
        usage,
        purpose,
        address,
        bedrooms,
        bathrooms,
        area,
        areaUnit,
        furnishing,
        parking,
        date,
        ownerPhone,
        ownerEmail,
        imageURL,
    })
    
    res.status(201).json({
        message: "Listing added",
        newProperty
    });
   }
   catch(error){
    console.error("Error Occured --->",error);
    return res.status(500).json({message: "Some internal server error!"});
   }
})

module.exports = router;