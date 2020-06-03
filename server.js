const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// load env
dotenv.config({ path: './config/config.env' });

// connection to mongoDB atals
connectDB();

// load express
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// set client
app.use(express.static(path.join(__dirname, 'public')));

// routes
const parksRouter = require('./routes/parks.router');
app.use('/api/v1/parks', parksRouter);



// listen on port...
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));