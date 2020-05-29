const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = Schema({
    type: String,
    start: Date,
    end: Date,
    attachment: String,
    credit: Number
});

module.exports = mongoose.model('Assignment', schema);