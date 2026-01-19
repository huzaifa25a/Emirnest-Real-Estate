const mongoose = require('mongoose');

const Property_Details = mongoose.Schema({
    property_ID: {type:String, required: true, unique: true},
    title: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    term: {type: String, enum: ["Monthly", "Yearly"], required: true},
    address: {
        property_name: {type: String, required: true},
        street: {type: String, required: true},
        city: {type: String, required: true},
        zip: {type: Number, required: true},
        country: {type: String, required: true}
    },
    type: {type: String, enum: ["Flat", "Studio", "House",], required: true},
    usage: {type: String, enum: ["Residential", 'Commercial'], required: true},
    purpose: { type: String, enum: ["Rent", "Sale"], required: true },
    bedrooms:   {type: Number, required: true},
    bathrooms: {type: Number, required: true},
    area: {type: Number, required: true},
    areaUnit: {type: String, enum: ["sqft", 'Sq. M.'], required: true},
    furnishing: {type: String, enum: ["Furnished", "Unfurnished", "Partially-furnished"]},
    parking: {type: String, enum: ["Yes", "No"]},
    date: {type: String, required: true},
    imageURL: {type: String},
    ownerPhone: {type: Number, required: true},
    ownerEmail: {type: String},
    listedBy: {
        user_ID: {type: String, required: true},
        name: {type: String, required: true},
        email: {type: String, required: true},
    },

},
    {timestamps: true}
)

module.exports = mongoose.model('property', Property_Details);