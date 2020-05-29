const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = Schema({
    start: Date,
    createdAt: Date,
    topic: String,
    description: String,
    activity: [{
        type: Schema.Types.ObjectId,
        ref: 'QuestionAnswer'
    }],
    assignments: [{
        type: Schema.Types.ObjectId,
        ref: 'Assignment'
    }],
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    },
    attender: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    visits: [Object]
});

module.exports = mongoose.model('Lesson', schema);