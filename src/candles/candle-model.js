const mongoose = require('mongoose');

const candleSchema = mongoose.Schema({
  currency: {
    type: String,
    required: true
  },
  finalDateTime: {
    type: Date,
    required: true
  },
  lowPrice: {
    type: Number,
    required: true
  },
  highPrice: {
    type: Number,
    required: true
  },
  closePrice: {
    type: Number,
    required: true
  },
  openPrice: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Candles', candleSchema)