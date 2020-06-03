const Park = require('../models/Park');
// route /api/v1/parks
// public access


// GET all parks
exports.getParks = async (req, res, next) => {
    try {
        console.log('in GET all parks');
        const parks = await Park.find();

        return res.status(200).json({
            success: true,
            count: parks.length,
            data: parks
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error, please try again...' });
    }
};

// Create a new park location
exports.addPark = async (req, res, next) => {
    try {
        console.log('in POST new park with: ', req.body);
        const park = await Park.create(req.body);
  
        return res.status(201).json({
            success: true,
            data: park
         });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'This park already exists!' });
        }
        res.status(500).json({ error: 'Server error, please try again...' });
    }
};
