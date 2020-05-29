const QuestionAnswer = require('../models/questionAnswer');

module.exports = {
    find: (__, {
        id
    }, context, info) => {},
    findById: (__, {
        id
    }, context, info) => {
        return QuestionAnswer.findById(id);

    },
    findOne: (__, {
        field,
        value
    }, context, info) => {

    },
    create: (__, {
        firstName,
        lastName,
        userName,
        email,
        password
    }, context, info) => {

    },
    edit: (__, {
        _id,
        firstName,
        lastName,
        userName,
        email,
        password
    }, context, info) => {

    },
    delete: (__, {
        _id
    }, context, info) => {


    },
    questionAnswer: ({
        activity
    }) => {
        return QuestionAnswer.find({
            _id: {
                $in: activity
            }
        });

    },

}