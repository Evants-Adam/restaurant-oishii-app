const router = require('express').Router();
const menuRouter = require('./menuRouter');

// const loginRouter = require('./loginRouter');
// const registerRouter = require('./registerRouter');
const orderRouter = require('./orderRouter');
const recipeRouter = require('./recipeRouter');
const ingredientRouter = require('./ingredientRouter');
const categoriesRouter = require('./categoriesRouter');
const measurementRouter = require('./measurementRouter');
const publicRouter = require('./publicRouter');

// *Require Middlewares*
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const errorHandler = require("../middlewares/errorHandler");

// *Available API*
// router.use('/login', loginRouter);
// router.use('/register', registerRouter);
router.use('/public', publicRouter);
router.use('/categories', categoriesRouter)
router.use('/pub/order', orderRouter);

router.use(authenticationMiddleware);
router.use('/menu', menuRouter);
router.use('/recipe', recipeRouter);
router.use('/ingredient', ingredientRouter);
router.use('/measurement', measurementRouter);

router.use(errorHandler);

module.exports = router;