const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: [
      "http://localhost:5173",
      "https://emirnest-real-estate.vercel.app/"
    ],
    credentials: true
}));

mongoose.connect(process.env.mongo_uri)
.then(() => {
    console.log('database connected');
})
.catch((err) => {
    console.error(err);
})

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/property', require('./routes/propertyRoutes'))
app.use('/api/contact', require('./routes/contactRoute'))
app.use('/api/mailingList', require('./routes/mailingList.js'));

app.listen(process.env.port, () => {
    console.log("Server listening at port ",process.env.port);
})