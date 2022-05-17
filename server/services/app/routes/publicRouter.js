const MenuController = require('../controllers/menuController');
const OrderController = require('../controllers/orderController');
const PublicController = require('../controllers/publicController');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');

const publicRouter = require('express').Router();

// *Available API*
publicRouter.get('/menu', MenuController.viewAllMenus);
// publicRouter.post('/login', PublicController.customerLogin);
// publicRouter.post('/register', PublicController.customerRegister);
publicRouter.get('/menu/:id', MenuController.viewOneMenu);
publicRouter.get('/user', authenticationMiddleware, PublicController.getUser);
publicRouter.post('/order/:id', authenticationMiddleware, PublicController.postOrder);
publicRouter.get('/order/:id', authenticationMiddleware, OrderController.viewUserOrder);

module.exports = publicRouter;