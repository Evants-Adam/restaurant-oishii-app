const customerRouter = require('express').Router();
const UserController = require('../controllers/UserController.js');

customerRouter.post('/register', UserController.createCustomer);
customerRouter.post('/login', UserController.loginCustomer);

module.exports = customerRouter;