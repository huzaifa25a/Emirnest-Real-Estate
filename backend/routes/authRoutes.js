const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
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

router.get('/userInfo', async (req, res) => {
    const user = jwt.verify(req.query.token, process.env.jwt_secret);
    console.log(user);
    const user_id = User.findOne({id: user.id});
    if(!user_id){
        return console.log('Could not find user info!')
    }
    res.json({
        name: user.username,
        email: user.email
    });
})

module.exports = router;