const express = require('express');
const contact = require('../models/contact');

const router = express.Router();

router.post('/contactUs', async (req, res) => {
    try{
        const {name, email, message} = req.body;
        const newContact = await contact.create({name, email, message});
        res.status(201).json({
            message: "message sent"
        });
    }
    catch(error){
        res.status(500).json({message: "Internal server error"})
    }
})

module.exports = router;