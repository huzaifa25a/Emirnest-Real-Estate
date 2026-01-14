const express = require('express');
const list = require('../models/mailingList');

const router = express.Router()

router.post('/email', async (req, res) => {
    const {email} = req.body;
    console.log("Received --->",email);
    try{
        const newEmail = await list.create({email});
        res.status(201).json({message: "subscribed", newEmail});
    }
    catch(error){
        console.log("Error subscribing --->", error);
        res.status(501).json({message: "server error!"});
    }
})

module.exports = router;