const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const protect = require('../middleware/authMiddleware');
require('dotenv').config();

const router = express.Router();

router.post('/signin', async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const existing = await User.findOne({email});
        if(existing){
            console.log("User already exists");
            return res.status(409).json({message: "User already exists"});
        }
        const hashed = await bcrypt.hash(password, 10); 
        const user = await User.create({username, email, password: hashed});
        console.log("Hashed Password --->",hashed);
        const payload = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        const token = jwt.sign(payload, process.env.jwt_secret, {expiresIn: '3h'});
        console.log("Token ---->", token);
        res.status(201).json({
            user: {name: user.username, email: user.email},
            token: token
        })
    }
    catch(error){
        console.error("Problem Occured --->",error)
        res.status(500).json({message: "Server Error"});
    }
})

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "not signed up"});
        }
        const verify = await bcrypt.compare(password, user.password || "");
        if(!verify){
            return res.status(401).json({message: "Invalid Credentials"});
        }
        const payload = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        const token = jwt.sign(payload, process.env.jwt_secret, {expiresIn: "3h"});
        res.json({
            user: {name: user.username, email: user.email},
            token: token
        })
    }
    catch(error){
        res.status(500).json({message: "There is internal server error!"});
    }
})

router.get('/checkAuth', protect, async (req, res) => {
    try{
        console.log('CHECKEDDDDD')
        res.status(200).json({message: "Authenticated"});
    }
    catch(err){
        res.status(403).json({message: "Not Authenticated"});
    }
})

router.get('/accountDetails', protect, async (req, res) => {
    try{
        const id = req.user.id;
        const user = await User.findOne({_id: id});
        res.json({
            name: user.username,
            email: user.email,
            phone: user.phone,
            createdAt: user.createdAt
        });
    }
    catch(err){
        res.status(401).json({message: "Unauthorized!"});
    }
})

module.exports = router;