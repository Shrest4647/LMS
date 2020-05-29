const Comment = require('../models/comment');

module.exports = {
    find: (__, {
        id
    }, context, info) => {
    },
    findById: (__, {
        id
    }, context, info) => {
        return Comment.findById(id);
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
    comment: ({reply})=> {
        return Comment.findById(reply);
    },
    comments: ({comments})=> {
        return Comment.find({_id: {$in: comments}});
    }

}