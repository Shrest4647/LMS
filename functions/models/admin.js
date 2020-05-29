const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = Schema({
    userName: String,
    password: String
});

module.exports = mongoose.model('Admin', schema);