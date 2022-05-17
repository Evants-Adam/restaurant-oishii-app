const LoginController = require('../controllers/loginController');

const loginRouter = require('express').Router();

// *Available API*
loginRouter.post('/', LoginController.postLogin);

module.exports = loginRouter;