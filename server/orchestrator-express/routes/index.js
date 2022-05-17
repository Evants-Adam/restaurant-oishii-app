const router = require('express').Router();
const CategoriesController = require('../controllers/categoriesController');
const MenusController = require('../controllers/menusController');
const UserController = require('../controllers/usersController');
const authenticationMiddleware = require('../middlewares/authentication');
const customerRouter = require('./customerRouter');
const userRouter = require('./userRouter');

router.get('/', UserController.getCredentials);
router.use('/customer', customerRouter);
router.use('/user', userRouter);
router.get('/categories', CategoriesController.getCategories);
router.get('/categories/:id', CategoriesController.getCategory);
router.get('/menus', MenusController.getMenus);

router.use(authenticationMiddleware);
router.post('/menus', MenusController.createMenu);
router.get('/menus/:id', MenusController.getMenuDetail);
router.delete('/menus/:id', MenusController.deleteMenu);

module.exports = router;