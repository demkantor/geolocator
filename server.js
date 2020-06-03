const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// load env
dotenv.config({ path: './config/config.env' });

// load express
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
const storesRouter = require('./routes/stores.router');
app.use('/api/v1/stores', storesRouter);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));