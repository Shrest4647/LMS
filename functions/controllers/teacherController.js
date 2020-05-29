const Teacher = require('../models/teacher');

module.exports = {
    login: async (__, {
        userName,
        password
    }, context, info) => {
        const client = await Teacher.findOne({
            userName
        });
        if (!client) {
            console.log("Invalid teacher user");
            return null;
        } else {
            bcrypt.compare(password, client.password).then(isMatch => {
                if (!isMatch)
                    return null;
                else {
                    const payload = {
                        id: client._id,
                        userName: client.userName,
                        role: 'teacher'
                    };
                    jwt.sign(payload, jwtSecret, {
                        expiresIn: '30d'
                    }, (err, token) => {
                        return {
                            token,
                            userName: client.userName,
                            id: client._id,
                            role: 'teacher'
                        };
                    });
                }
            });
        }
    },
    find: (__, {
        id
    }, context, info) => {
        return Teacher.find();
    },
    findById: (__, {
        id
    }, context, info) => {
        return Teacher.findById(id);
    },
    findOne: (__, {
        field,
        value
    }, context, info) => {

    },
    create: (__, {
        data
    }, context, info) => {
        return Teacher.findOne({
            userName: data.userName
        }).then((client) => {
            if (client) {
                return null;
            }
            bcrypt.hash(data.password, 10, (err, hash) => {
                if (err) throw err;
                data.password = hash;
                return Teacher.create(data);
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
        return Teacher.findByIdAndRemove(id, (err, client) => {
            if (err) return false;
            return true
        });


    },
    teacher: ({
        teacher
    }) => {
        return Teacher.findById(teacher);
    },
    teachers: ({
        teachers
    }) => {
        return Teacher.find({
            _id: {
                $in: teachers
            }
        });
    }

}