const mongo = require('mongoose');

const list = mongo.Schema({
    email: {
        type: String,
        unique: true
    }
}, {timestamps: true})

module.exports = mongo.model('list', list);