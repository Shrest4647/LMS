const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtSecret');

module.exports = {
    login: (__, {
        userName,
        password
    }, context, info) => {
        return Admin.findOne({
            userName
        }).then((client) => {
            if (!client) {
                console.log("Invalid admin user");
                return null;
            } else {
                bcrypt.compare(password, client.password).then(isMatch => {
                    if (!isMatch)
                        return null;
                    else {
                        const payload = {
                            id: client._id,
                            userName: client.userName,
                            role: 'administator'
                        };
                        jwt.sign(
                            payload,
                            jwtSecret, {
                                expiresIn: '1h'
                            },
                            (err, token) => {
                                return {
                                    token,
                                    userName: client.userName,
                                    id: client._id,
                                    role: 'administator'
                                };
                            }
                        )
                    }
                })
            }
        })
    },
    findById: (__, {
        id
    }, context, info) => {

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


    }

}