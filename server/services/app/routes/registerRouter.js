const RegisterController = require('../controllers/registerController');

const registerRouter = require('express').Router();

// *Available API*
registerRouter.post('/', RegisterController.postRegister);

module.exports = registerRouter;