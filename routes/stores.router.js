const express = require('express');
const router = express.Router();
const { getStores } = require('../controlers/stores');


// get stores
router.route('/').get(getStores);



module.exports = router;