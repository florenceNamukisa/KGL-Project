const mongoose = require('mongoose');

const produceSchema = new mongoose.Schema({
    produceName: {
        type: String, 
        trim: true,
        required: true,
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
        required: true,
    },
    cost: {
        type: Number,
        trim: true,
        required: true,
    },
    dealerName: {
        type: String,
        trim: true,
        required: true,
    },
    branch: {
        type: String,
        trim: true,
        required: true,
    },
    contact: {
        type: String,  // Changed to String to accommodate leading zeros in phone numbers
        trim: true,
        required: true,
    },
    sellingPrice: {
        type: Number,
        trim: true,
        required: true,
    }
});

module.exports = mongoose.model('Produce', produceSchema);
