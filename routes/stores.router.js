const express = require('express');
const router = express.Router();


// get stores
router.get('/', (req, res) => {
    console.log('in GET store');
    res.send('hello you!')

});



module.exports = router;