const mongoose = require('mongoose');

const produceSchema = new mongoose.Schema({
    produceName: {
        type: String, 
        trim: true,

    },
    produceType: {
        type: String,
        trim: true,
        
    },
    date: {
        type: Date,  // Corrected to Date type
        trim: true,
    },
    time: {
        type: String,  // Changed to String to handle time format
        trim: true,
        
    },
    tonnage: {
        type: Number,
        trim: true,
    },
    cost: {
        type: Number,
        trim: true,
    },
    dealerName: {
        type: String,
        trim: true,
    },
    branch: {
        type: String,
        trim: true,
    },
    contact: {
        type: Number,  // Changed to String to accommodate leading zeros in phone numbers
        trim: true,
    },
    sellingPrice: {
        type: Number,
        trim: true,
    }
});

module.exports = mongoose.model('Produce', produceSchema);
