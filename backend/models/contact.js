const mongoose = require('mongoose');

const Contact_Details = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true},
},
    {timestamps: true}
)

module.exports = mongoose.model('contact', Contact_Details);