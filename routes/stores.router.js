const express = require('express');
const router = express.Router();
const { getStores, addStore } = require('../controlers/stores');


// get stores
router
.route('/')
.get(getStores)
.post(addStore);


module.exports = router;
