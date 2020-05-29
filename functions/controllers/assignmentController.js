const Assignment = require('../models/assignment');

module.exports = {
    find: (__, {
        id
    }, context, info) => {
    },
    findById: (__, {
        id
    }, context, info) => {
        return Assignment.findById(id);
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
    assignments: ({assignments})=> {
        return Assignment.find({_id: {$in: assignments}});
    }

}