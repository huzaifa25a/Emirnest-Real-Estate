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
    const {title, description, price, address, type, bedrooms, bathrooms, area, imageURL} = req.body;
   
    const newProperty = await property.create({
        title,
        description,
        price,
        address,
        type,
        bedrooms,
        bathrooms,
        area,
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