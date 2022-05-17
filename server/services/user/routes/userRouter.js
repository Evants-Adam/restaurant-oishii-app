const userRouter = require('express').Router();
const UserController = require('../controllers/UserController.js');

userRouter.post('/register', UserController.createUser);
userRouter.post('/login', UserController.loginUser);

module.exports = userRouter;