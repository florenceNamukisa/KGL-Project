const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
  buyerName: {
    type: String,
    trim: true
  },
  nationalId: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  contact: {
    type: String,
    trim: true
  },
  amountDue: {
    type: Number
  },
  salesAgent: {
    type: String,
    trim: true
  },
  branch: {
    type: String,
    trim: true
  },
  dueDate: {
    type: Date
  },
  produceName: {
    type: String,
    trim: true
  },
  produceType: {
    type: String,
    trim: true
  },
  tonnage: {
    type: Number
  },
  dispatchDate: {
    type: Date
  }
});

module.exports = mongoose.model('Credit', creditSchema);


