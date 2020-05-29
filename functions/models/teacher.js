const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = Schema({
    userName: String,
    password: String,
    email: String,
    classes: [{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }],
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
    }],
    assignments: [{
        type: Schema.Types.ObjectId,
        ref: 'Assignment'
    }]
});

module.exports = mongoose.model('Teacher', schema);