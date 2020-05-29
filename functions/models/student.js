const mongoose = require('mongoose')
const Schema = mongoose.Schema

const progressSchema = Schema({
    date: Date,
    lesson: String,
    grade: String
})

const schema = Schema({
    userName: String,
    password: String,
    class: {
        type: Schema.Types.ObjectId, ref: 'Class'
    },
    lessonAttended: [{
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
    }],
    lessonRemaining: [{
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
    }],
    assignmentSubmitted: [{
        type: Schema.Types.ObjectId,
        ref: 'Assignment'
    }],
    assignmentRemaining: [{
        type: Schema.Types.ObjectId,
        ref: 'Assignment'
    }],
    progress: [progressSchema]
});

module.exports = mongoose.model('Student', schema);