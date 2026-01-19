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
    const {property_ID, title, description, price, term, type, usage, purpose, address, bedrooms, bathrooms, area, areaUnit, furnishing, parking, date, ownerPhone, ownerEmail, imageURL} = req.body;

    const listedBy = {user_ID: req.user.id, name: req.user.username, email: req.user.email};
    console.log(listedBy);
   
    const newProperty = await property.create({
        property_ID,
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
        listedBy: listedBy
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

router.get('/:property_ID', async(req, res) => {
    try{
        const propertyData = await property.findOne({property_ID: req.params.property_ID});

        if(!propertyData){
            return console.log('Error fetching property data!');
        }

        res.json(propertyData)
    }
    catch(error){
        console.log('Error fetching property data --->', error);
    }
})

module.exports = router;