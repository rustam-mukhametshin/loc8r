const mongoose = require("mongoose");

const {Schema} = mongoose;

const openingTimeSchema = new Schema({
    days: {
        type: String,
        required: true
    },
    opening: String,
    closing: String,
    closed: {
        type: Boolean,
        required: true
    }
})

const locationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    rating: {
        type: Number,
        'default': 0,
        min: 0,
        max: 5
    },
    facilities: [String],
    coords: {
        type: {type: String},
        coordinates: [Number]
    },
    openingTimes: [openingTimeSchema]
});

locationSchema.index({coords: '2dsphere'})
