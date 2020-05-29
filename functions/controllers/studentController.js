const Student = require('../models/student');

module.exports = {
    login: async (__, {
        userName,
        password
    }, context, info) => {
        return Student.findOne({
            userName
        }).then((client) => {
            if (!client) {
                console.log("Invalid student user");
                return null;
            } else {
                bcrypt.compare(password, client.password).then(isMatch => {
                    if (!isMatch)
                        return null;
                    else {
                        const payload = {
                            id: client._id,
                            userName: client.userName,
                            role: 'student'
                        };
                        jwt.sign(
                            payload,
                            jwtSecret, {
                                expiresIn: '30d'
                            },
                            (err, token) => {
                                return {
                                    token,
                                    userName: client.userName,
                                    id: client._id,
                                    role: 'student'
                                };
                            }
                        )
                    }
                })
            }
        })
    },
    find: (__, _, context, info) => {
        return Student.find();
    },
    findById: (__, {
        id
    }, context, info) => {
        return Student.findById(id);
    },
    findByField: async (__, {
        field,
        value
    }, context, info) => {
        return Student.where(field, value);
    },
    create: (__, {
        data
    }, context, info) => {
        return Student.findOne({
            userName: data.userName
        }).then((client) => {
            if (client) {
                return null;
            }
            bcrypt.hash(data.password, 10, (err, hash) => {
                if (err) throw err;
                data.password = hash;
                return Student.create(data);
            });
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

    },
    delete: (__, {
        id
    }, context, info) => {
        return Student.findByIdAndRemove(id)

    },
    student: ({
        student
    }) => {
        return Student.findById(student);
    },
    students: ({
        students
    }) => {
        return Student.find({
            _id: {
                $in: students
            }
        });
        // return Student.find({ class: _id });
    }

}