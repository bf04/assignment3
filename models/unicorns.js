const mongoose = require('mongoose');
const unicornSchema = new mongoose.Schema({
});

const unicornModel = mongoose.model('unicorn', unicornSchema);

module.exports = unicornModel;