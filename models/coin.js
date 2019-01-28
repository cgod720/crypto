const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coinSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: Number,
  image: String,
  description: String
}, {timestamps: true});

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;
