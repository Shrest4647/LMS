const express = require('express');
const {
    ApolloServer,
    gql
} = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
const resolvers = require('./resolver');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtSecret');
const authChecker = require('../middleware/authChecker');
const studentContr = require('../controllers/studentController');
const teacherContr = require('../controllers/teacherController');
const adminContr = require('../controllers/adminController');
const register = require('./register');
const app = express();
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, OPTIONS');
    next();
});
app.use(cors());
app.post('/login', (req, res, next)=> {
    studentContr.login(null, { userName: req.body.userName, password: req.body.password}).then(response=> {
        if(!response) {
            res.status(401).json({
                message: "You are not authenticated!"
              });
        }
        res.json(response);
    })
});
app.post('/admin/login', (req, res, next)=> {
    adminContr.login(null, { userName: req.body.userName, password: req.body.password}).then(response=> {
        if(!response) {
            res.status(401).json({
                message: "You are not authenticated!"
              });
        }
        res.json(response);
    })
});
app.post('/teacher/login', (req, res, next)=> {
    teacherContr.login(null, { userName: req.body.userName, password: req.body.password}).then(response=> {
        if(!response) {
            res.status(401).json({
                message: "You are not authenticated!"
              });
        }
        res.json(response);
    })
});
app.post('/admin/register', register);
app.use('/graphql', authChecker);

mongoose.connect("mongodb://localhost:27017/SchoolLMS", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then((arg) => {
    console.log("Mongodb connected");
})


const typeDefs = gql(fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({
        req
    }) => {
        try {
            const token = req.headers.authorization;
            const decodedToken = jwt.verify(token, jwtSecret);
            let user = {
                userName: decodedToken.userName,
                id: decodedToken.id,
                role: decodedToken.role
            };
            console.log(user.role);
            return {
                user
            };
        } catch (error) {
            console.log('user invalid');
            return;
        }
    }
});
// console.log(server);
server.applyMiddleware({
    app
});

module.exports = app;