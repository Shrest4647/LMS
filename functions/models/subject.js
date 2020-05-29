const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = Schema({
    name: String,
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    notices: [{
        type: Schema.Types.ObjectId,
        ref: 'Notice'
    }],
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
    }]
});

module.exports = mongoose.model('Subject', schema);