const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');


const ParkSchema = new mongoose.Schema({
    parkId: {
        type: String,
        required: [true, 'Please add a park name!'],
        unique: true,
        trim: true,
        maxlength: [40, 'Park name must be less than 40 characters!']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        type: {
            type: String, 
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


// geocode middleware create location
ParkSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    console.log('middleware info:', loc);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    };

    // making address undefined will not save it to DB, we have formatted address
    this.address = undefined;
    next();
});
  

module.exports = mongoose.model('Park', ParkSchema);
