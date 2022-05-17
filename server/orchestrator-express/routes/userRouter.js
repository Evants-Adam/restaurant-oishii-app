const userRouter = require('express').Router();
const UserController = require('../controllers/usersController.js');

userRouter.post('/register', UserController.createUser);
userRouter.post('/login', UserController.loginUser);

module.exports = userRouter;