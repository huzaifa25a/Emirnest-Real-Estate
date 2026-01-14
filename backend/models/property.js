const mongoose = require('mongoose');

const Property_Details = mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    address: {
        street: {type: String, required: true},
        city: {type: String, required: true},
        zip: {type: Number, required: true},
        country: {type: String, required: true}
    },
    type: { type: String, enum: ["rent", "sale"], required: true },
    bedrooms:   {type: Number, required: true},
    bathrooms: {type: Number, required: true},
    area: {type: Number, required: true},
    imageURL: {type: String},
    listedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
},
    {timestamps: true}
)

module.exports = mongoose.model('property', Property_Details);