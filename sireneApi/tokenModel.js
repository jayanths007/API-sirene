const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    token : String
})
module.exports = mongoose.model('token',tokenSchema,'tokens');
