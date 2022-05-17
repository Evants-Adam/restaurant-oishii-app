const OrderController = require('../controllers/orderController');

const orderRouter = require('express').Router();

// *Available API*
orderRouter.get('/', OrderController.viewAllOrder);
orderRouter.get('/:id', OrderController.viewUserOrder);
orderRouter.delete('/:id', OrderController.deleteOrder);
orderRouter.patch('/:id', OrderController.patchOrder);
orderRouter.post('/:id', OrderController.postOrder);
orderRouter.put('/:id', OrderController.editOrder);

module.exports = orderRouter;