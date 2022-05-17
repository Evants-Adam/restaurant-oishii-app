const router = require('express').Router();
const userRouter = require('./userRouter');
const customerRouter = require('./customerRouter');
const UserController = require('../controllers/UserController.js');

// *Available API*
// router.get('/', UserController.getCredentials);
router.use('/user', userRouter);
router.use('/customer', customerRouter);

module.exports = router;