const jwt = require("jsonwebtoken");
const jwtSecret = require('../config/jwtSecret');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, jwtSecret);
    req.userData = {
      userName: decodedToken.userName,
      id: decodedToken.userId,
      role: decodedToken.role
    };
    next();
  } catch (error) {
    res.status(401).json({
      message: "You are not authenticated!"
    });
  }
};