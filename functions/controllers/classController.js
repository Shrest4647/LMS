const Class = require('../models/class');
const Notice = require('../models/notice');

module.exports = {
    find: (__, {
        id
    }, context, info) => {
        return Class.find();
    },
    findById: (__, {
        id
    }, context, info) => {

        return Class.findById(id);
    },
    findByGrade: (__, {
        grade
    }, context, info) => {

        return Class.findOne({
            grade
        });
    },
    create: async (__, {
        grade
    }, context, info) => {
        return await Class.create({
            grade
        });

    },
    edit: (__, {}, context, info) => {

    },
    delete: (__, {
        id
    }, context, info) => {
        return Class.findByIdAndRemove(id, (err, result) => {
            if (err) return false;
            return true;
        })
    },
    class: async (__) => {
        return Class.findById(__.class);
    },
    classes: async ({
        classes
    }) => {
        return Class.find({
            _id: {
                $in: classes
            }
        });
    },
    addNotice: async (classId, noticeId) => {
        Class.update({
            _id: classId
        }, {
            $push: {
                notices: noticeId
            }
        }, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    },
    removeNotice: async (classId, noticeId) => {
        Class.update({
            _id: classId
        }, {
            $pull: {
                notices: noticeId
            }
        }, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    },
    addStudent: async (classId, sudentId) => {
        Class.update({
            _id: classId
        }, {
            $push: {
                students: {
                    $each: studentId
                }
            }
        }, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    },
    removeStudent: async (classId, studentId) => {
        Class.update({
            _id: classId
        }, {
            $pull: {
                students: {
                    $each: sudentId
                }
            }
        }, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    },
    addSubject: async (classId, subjectId) => {
        Class.update({
            _id: classId
        }, {
            $push: {
                students: subjectId
            }
        }, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    },
    removeSubject: async (classId, subjectId) => {
        Class.update({
            _id: classId
        }, {
            $pull: {
                students: subjectId
            }
        }, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    },

}