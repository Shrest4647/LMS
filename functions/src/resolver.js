const adminCont = require('../controllers/adminController');
const classCont = require('../controllers/classController');
const subjectCont = require('../controllers/subjectController');
const noticeCont = require('../controllers/noticeController');
const lessonCont = require('../controllers/lessonController');
const assignmentCont = require('../controllers/assignmentController');
const commentCont = require('../controllers/commentController');
const studentCont = require('../controllers/studentController');
const teacherCont = require('../controllers/teacherController');
const qAndACont = require('../controllers/qAndAController');
const date = require('../config/date');
const {
    GraphQLJSON
} = require('graphql-type-json');
module.exports = {
    // Sacalars
    Date: date,
    JSON: GraphQLJSON,
    Class: {
        subjects: subjectCont.subjects,
        notices: noticeCont.notices,
        classTeacher: teacherCont.teacher,
        students: studentCont.students,
        teachers: teacherCont.teachers
    },
    Subject: {
        teacher: teacherCont.teacher,
        notices: noticeCont.notices,
        lessons: lessonCont.lessons
    },
    Lesson: {
        activity: qAndACont.questionAnswer,
        assignments: assignmentCont.assignments,
        subject: subjectCont.subject,
        students: studentCont.students,
        comments: commentCont.comments
    },
    Comment: {
        reply: commentCont.comment
    },
    Student: {
        class: classCont.class,
        lessonAttended({
            lessonAttended
        }) {
            return lessonCont.lessons({
                lessons: lessonAttended
            });
        },
        lessonRemaining({
            lessonRemaining
        }) {
            return lessonCont.lessons({
                lessons: lessonRemaining
            });
        },
        assignmentSubmitted({
            assignmentSubmitted
        }) {
            return assignmentCont.assignments({
                assignments: assignmentSubmitted
            });
        },
        assignmentRemaining({
            assignmentRemaining
        }) {
            return assignmentCont.assignments({
                assignments: assignmentRemaining
            });
        }
    },
    Teacher: {
        classes: classCont.classes,
        subjects: subjectCont.subjects,
        lessons: lessonCont.lessons,
        assignments: assignmentCont.assignments
    },
    // Query
    Query: {
        // admin: adminCont.login,
        // teacherLogin: teacherCont.login,
        // studentLogin: studentCont.login,
        class: classCont.findById,
        classByGrade: classCont.findByGrade,
        subject: subjectCont.findById,
        notice: noticeCont.findById,
        recentNotice: noticeCont.findRecent,
        lesson: lessonCont.findById,
        recentLesson: lessonCont.findRecent,
        assignment: assignmentCont.findById,
        comment: commentCont.findById,
        student: studentCont.findById,
        students: studentCont.find,
        teacher: teacherCont.findById,
        teachers: teacherCont.find,
        questionAnswer: qAndACont.findById
    },
    Mutation: {
        newTeacher: teacherCont.create,
        deleteTeacher: teacherCont.delete,
        newStudent: studentCont.create,
        deleteStudent: studentCont.delete,
        // resetStudentPassword: studentCont.resetPassword,
        newClass: classCont.create,
        deleteClass: classCont.delete,
        addNoticeInClass: noticeCont.create,
        removeNoticeFromClass: noticeCont.delete,
        addStudentInClass: classCont.addStudent,
        // addTeacherInClass(data: [TeacherInput], classId: String): [Teacher]
        removeStudentFromClass: classCont.removeStudent,
        // removeTeacherFromClass( id: [String], classId: String ): Boolean
        // editClassSubjects(data: JSON): [Subject]
        newSubject: subjectCont.create,
        // addNoticeInSubject: subjectCont.addNotice,
        // removeNoticeFromSubject: subjectCont.removeNotice,
        newLesson: lessonCont.create,
        editLesson: lessonCont.edit,
        lesson: lessonCont.findById,
        addAttenderOnLesson: lessonCont.addAttender,
        addActivityOnLesson: lessonCont.addActivity,
        addAssignmentOnLesson: lessonCont.addAssignment
    }


}