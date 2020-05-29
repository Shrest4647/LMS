const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = Schema({
    grade: String,
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    notices: [{
        type: Schema.Types.ObjectId,
        ref: 'Notice'
    }],
    classTeacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    teachers: [{
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    }]
});

module.exports = mongoose.model('Class', schema);