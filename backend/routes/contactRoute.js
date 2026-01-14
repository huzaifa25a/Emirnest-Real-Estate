const express = require('express');
const contact = require('../models/contact');

const router = express.Router();

router.post('/contactUs', async (req, res) => {
    try{
        const {name, email, subject, message,} = req.body;
        const newMessage = await contact.create({name, email, subject, message});
        res.status(201).json({
            newMessage,
            message: "message sent"
        });
    }
    catch(error){
        res.status(500).json({message: "Internal server error"})
    }
})

module.exports = router;