const customerRouter = require('express').Router();
const CustomerController = require('../controllers/customerController');

customerRouter.post('/register', CustomerController.createCustomer);
customerRouter.post('/login', CustomerController.loginCustomer);

module.exports = customerRouter;