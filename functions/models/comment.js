const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = Schema({
    message: String,
    details: Object,
    reply: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }
});

module.exports = mongoose.model('Comment', schema);