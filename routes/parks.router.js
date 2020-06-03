const express = require('express');
const router = express.Router();
const { getParks, addPark } = require('../controlers/parks');


// get skateparks
router
.route('/')
.get(getParks)
.post(addPark);


module.exports = router;
