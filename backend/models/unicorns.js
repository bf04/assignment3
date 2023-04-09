const mongoose = require('mongoose');

const unicornsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  favoriteFood: {
    type: String,
    required: true
  }
});

const unicornModel = mongoose.model('unicorns', unicornsSchema);

module.exports = unicornModel;
