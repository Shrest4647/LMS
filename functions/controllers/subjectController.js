const Subject = require('../models/subject');
const classCont = require('./classController');

module.exports = {
    count: (__, _, context, info) => {
        // if(!context.user) return;
        return Subject.countDocuments().then(count => {
            return {
                count
            }
        });
    },
    find: (__, {
        limit
    }, context, info) => {
        // if(!context.user) return;
        return Subject.find().limit(limit);
    },
    findById: (__, {
        id
    }, context, info) => {
        // if(!context.user) return;
        return Subject.findById(id);
    },
    findOne: async (__, {
        field,
        value
    }, context, info) => {
        // if(!context.user) return;        
        return await Subject.where(field, value);
    },
    create: async (__, {
        data,
        classId
    }, context, info) => {
        // if (!context.user) return;
        let subject = new Subject(data);
        return subject.save().then((sub) => {
            if (!sub) return null;
            classCont.addSubject(classId, sub._id);
            return sub;
        });
    },
    edit: (__, {
        _id,
        firstName,
        lastName,
        userName,
        email,
        password
    }, context, info) => {
        Subject.findByIdAndUpdate(_id, {
            _id,
            firstName,
            lastName,
            userName,
            email,
            password
        }, (err, Subject) => {
            if (err) {
                console.log(err);
                return null;
            }
            let token = 'A token';
            let createdDate = new Date();
            return {
                userName: Subject.userName,
                email: Subject.email,
                createdDate,
                token
            };
        }).catch(err => {
            console.log(err);
            return null;

        })
    },
    delete: (__, {
        _id
    }, context, info) => {
        Subject.findByIdAndRemove(_id, (err, Subject) => {
            if (err) {
                console.log(err);
                return null;
            }
            return Subject;
        }).catch(err => {
            console.log(err);
            return null;

        })
    },
    addLesson: async (subjectId, id) => {
        Subject.update({
            _id: subjectId
        }, {
            $push: {
                lessons: id
            }
        }, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    },
    subject: ({
        subject
    }) => {
        // if(!context.user) return;
        return Subject.findById(subject);
    },
    subjects: ({
        subjects
    }) => {
        // if(!context.user) return;
        return Subject.find({
            _id: {
                $in: subjects
            }
        });
    },

}