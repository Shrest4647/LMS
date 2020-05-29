const Lesson = require('../models/lesson');
const subjectCont = require('./subjectController');
const QuestionAnswer = require('../models/questionAnswer');
const Assignment = require('../models/assignment');
const moment = require('moment');

module.exports = {
        count: (__, _, context, info) => {
            return Lesson.countDocuments().then((count => {
                console.log(count);
                return {
                    count
                };
            }));
        },
        todayCount: (__, _, context, info) => {
            let today = moment().startOf('day');
            let endToday = moment().endOf('day');
            return Lesson.countDocuments({
                start: {
                    $gt: today,
                    $lt: endToday
                }
            }).then((count) => {
                console.log(count, "today");
                return {
                    count
                };
            });
        },
        find: (__, {
            limit
        }, context, info) => {
            return Lesson.find().limit(limit);
        },
        findById: (__, {
            id
        }, context, info) => {
            if (!context.user.userId) return null;
            let lesson = Lesson.findById(id);
            let now = Date.now();
            lesson.visits.push({
                time: now,
                role: context.user.role,
                id: context.user.id
            });
            lesson.save();
            return lesson;
    },
    findRecent: async (__, _, context, info) => {
            return Lesson.find().sort({
                _id: -1
            }).limit(5);
        },
        // Create and Save a new Lesson
        create: (__, {
            data,
            subjectId
        }, context, info) => {
            // Validate request

            // Create a Lesson
            let lesson = new Lesson(data);
            // Save Lesson in the database
            return lesson.save()
                .then(data => {
                    if (!data) return null;
                    subjectCont.addLesson(subjectId, data._id)
                    return data;
                }).catch(err => {
                    console.log(err);
                    return null;
                });
        },

        edit: (__, {
            id,
            data
        }, context, info) => {
            // Validate request
            Lesson.findByIdAndUpdate(id, data).then(lesson => {
                if (!lesson) {
                    return null;
                }
                return lesson;
            }).catch(err => {
                return null;
            });
        },
        delete: (__, {
            id
        }, context, info) => {
            Lesson.findOneAndRemove({
                    _id: id
                })
                .then(lesson => {
                    if (!lesson) {
                        return null;
                    }
                    return lesson;
                }).catch(err => {
                    return null;
                });
        },
        addAttender: (__, {
            id,
            studentId
        }, context, info) => {
            return Lesson.update({
                _id: id
            }, {
                $push: {
                    attender: studentId
                }
            }, (err, result) => {
                if (err) throw err;
                return true
            })
        },
        addActivity: (__, {
            data,
            id
        }, context, info) => {
            let qans = new QuestionAnswer(data);
            return qans.save().then(qan => {
                Lesson.update({
                    _id: id
                }, {
                    $push: {
                        activity: qan._id
                    }
                });
                return qan;
            });
        },
        addAssignment: (__, {
            data,
            id
        }, context, info) => {
            let assign = new Assignment(data);
            return assign.save().then(assignment => {
                Lesson.update({
                    _id: id
                }, {
                    $push: {
                        assignment: assignment._id
                    }
                });
                return assignment;
            });
        },
        lesson: ({
            lesson
        }) => {
            return Lesson.findById(lesson);
        },
        lessons: ({
            lessons
        }) => {
            return Lesson.find({
                _id: {
                    $in: lessons
                }
            });
        }
}