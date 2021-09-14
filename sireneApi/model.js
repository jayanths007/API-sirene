const mongoose = require('mongoose');

const sireneSchema = mongoose.Schema({
    name: String,
    content: String
});

module.exports = mongoose.model('sirene', sireneSchema,'sirene');
