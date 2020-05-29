const Notice = require('../models/notice');
const classCont = require('./classController');

module.exports = {
    count: (__, _, context, info) => {
        return Notice.countDocuments().then(count => {
            return {
                count
            };
        });
    },
    find: (__, {
        limit
    }, context, info) => {
        return Notice.find();
    },
    findById: (__, {
        id
    }, context, info) => {
        return Notice.findById(id);
    },
    findRecent: (__, _, context, info) => {
        return Notice.find().sort({
            _id: -1
        }).limit(5);
    },
    create: async (__, {
        data,
        classId
    }, context, info) => {
        let notice = new Notice(data);
        return notice.save().then(notice => {
            if (!notice) return null;
            classCont.addNotice(classId, notice._id);
            return notice;
        });
    },
    delete: (__, {
        id,
        classId
    }, context, info) => {
        Notice.findByIdAndRemove(_id, (err, notice) => {
            if (err) {
                console.log(err);
                return null;
            }
            classCont.removeNotice(classId, notice._id);
            return notice;
        }).catch(err => {
            console.log(err);
            return null;
        });
    },
    notices: ({
        notices
    }) => {
        return Notice.find({
            _id: {
                $in: notices
            }
        });
    }
}