const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    produceName: {
        type: String, 
        trim: true,
        required: true
    },
    tonnage: {
        type: Number,
        trim: true,
        required: true
    },
    amountPaid: {
        type: Number,
        trim: true,
        required: true
    },
    buyerName: {
        type: String,
        trim: true,
        required: true
    },
    salesAgentName: {
        type: String,
        trim: true,
        required: true
    },
    branch: {
        type: String,
        trim: true,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Sales', salesSchema);
