const Admin = require('../models/admin');
const jwtSecret = require('../config/jwtSecret');

module.exports = async (req, res, next) => {
    const newAdmin = new Admin({
        password: req.body.password,
        userName: req.body.userName,
    });
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin.save()
                .then(client => {
                    const payload = {
                        id: client._id,
                        userName: client.userName,
                        role: 'administator'
                    };
                    jwt.sign(payload, jwtSecret, {
                        expiresIn: '7d'
                    }, (err, token) => {
                        res.json({
                            token,
                            userName: client.userName,
                            id: client._id,
                            role: 'administator'
                        });
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message: err
                    });
                    console.log(err)
                });

        });

    });
}