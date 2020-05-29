const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = Schema({
    question: String,
    answer: String,
    info: String
});

module.exports = mongoose.model('QuestionAnswer', schema);
