const { MyOrder, Menu, User, Categories, sequelize } = require('../models/index');
const { Op } = require('sequelize');

class OrderController {
  static async postOrder (req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { id } = req.params;
      const { quantity } = req.body;

      console.log(req.user.id)

      if (!quantity) throw ({ name: 'QuantityNotFound' })
      
      const menu = await Menu.findByPk(id);
      if (!menu) throw ({ name: 'MenuNotFound' })

      const createOrder = await MyOrder.create({
        UserId: req.user.id,
        MenuId: id,
        quantity: quantity,
        totalPrice: (quantity * menu.price),
        status: 'Open'
      }, { transaction: t })

      const menuUpdate = await Menu.update({
        stock: menu.stock - quantity
      }, {
        where: { id: id }
      }, { transaction: t })

      await t.commit();
      res.status(201).json({ message: 'Order success!'})
    } catch (error) {
      await t.rollback()
      next(error)
    }
  }

  static async viewAllOrder (req, res, next) {
    try {
      const orders = await MyOrder.findAll({
        attributes: {
          exclude: ['updatedAt']
        },
        include: [
          { 
            model: Menu,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
              {
              model: Categories,
              attributes: { exclude: ['createdAt', 'updatedAt'] }
              }
            ]
          }
        ],
        where: {
          status: 'Open'
        },
        order: [['createdAt']]
      })

      res.status(200).json(orders)
    } catch (error) {
      next(error)
    }
  }

  static async viewUserOrder (req, res, next) {
    try {
      const { id } = req.params;
      const orders = await MyOrder.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [
          { 
            model: Menu,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
              {
              model: Categories,
              attributes: { exclude: ['createdAt', 'updatedAt'] }
              }
            ]
          }
        ],
        where: {
          UserId: id,
        }
      })

      res.status(200).json(orders)
    } catch (error) {
      next(error)
    }
  }

  static async patchOrder (req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) throw ({ name: 'StatusNotValid' })

      const order = await MyOrder.findByPk(id);
      if (!order) throw ({ name: 'OrderNotFound' })

      const patchOrder = await MyOrder.update({
        status: status
      }, {
        where: {
          id: id
        }
      })

      res.status(200).json({ message: 'Status has been changed' })
    } catch (error) {
      next(error)
    }
  }

  static async deleteOrder (req, res, next) {
    try {
      const { id } = req.params;

      const order = await MyOrder.findByPk(id);
      if (!order) throw ({ name: 'OrderNotFound' });

      if (req.user.role !== 'Admin' || order.UserId !== req.user.id) throw ({ name: 'Forbidden' })
      const deleteOrder = await MyOrder.update({
        status: 'Cancelled'
      }, {
        where: {
          id: id
        }
      })
      res.status(200).json({ message: 'Order has been cancelled' })
    } catch (error) {
      next(error)
    }
  }

  static async editOrder (req, res, next) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      if (!quantity) throw ({ name: 'QuantityNotFound' });

      const order = await MyOrder.findByPk(id);
      if (!order) throw ({ name: 'OrderNotFound' });

      if (quantity <= 0) {
        if (req.user.role !== 'Admin' || order.UserId !== req.user.id) throw ({ name: 'Forbidden' })
        const updateOrder = await MyOrder.update({
          status: 'Cancelled'
        }, {
          where: {
            id: id
          },
          returning: true
        })
      } else {
        if (req.user.role !== 'Admin' || order.UserId !== req.user.id) throw ({ name: 'Forbidden' })
        const updateOrder = await MyOrder.update({
          quantity: quantity
        }, {
          where: {
            id: id
          },
          returning: true
        })
      }

      res.status(200).json({ message: 'Order has been edited' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = OrderController;