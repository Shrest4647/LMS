const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = Schema({
    date: Date,
    message: String
});

module.exports = mongoose.model('Notice', schema);