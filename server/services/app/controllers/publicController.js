const { Op } = require('sequelize');
const { comparePassword } = require('../helpers/hash');
const { signToken } = require('../helpers/jwt');
const { User, Menu, Categories, Recipe, Ingredient, Measurement, MyOrder, sequelize } = require('../models/index');

class publicController {
  static async customerLogin (req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw ({ name: 'LoginBadRequest' });
      const user = await User.findOne({ 
        where: { 
          [Op.and]: {
            email: email,
            role: 'Customer'
          }
        }
      });

      if (!user) throw ({ name: 'LoginBadRequest' });
      const verify = comparePassword(password, user.password);

      if (!verify) throw ({ name: 'LoginBadRequest' });
      const accessToken = signToken({ id: user.id, email: user.email });
      res.status(200).json({ access_token: accessToken })
    } catch (error) {
      next(error)
    }
  }

  static async customerRegister (req, res, next) {
    try {
      const { email, password, phoneNumber, address } = req.body;

      const user = await User.create(
        { 
          email, 
          password, 
          phoneNumber, 
          address,
          role: 'Customer'
        }
      );

      res.status(201).json({ id: user.id, email: user.email })
    } catch (error) {
      next(error)
    }
  }

  static async postOrder (req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { id } = req.params;
      const { quantity } = req.body;

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
      res.status(201).json(createOrder)
    } catch (error) {
      await t.rollback()
      next(error)
    }
  }

  static async getUser (req, res, next) {
    if (req.user) {
      const { id, email, role } = req.user;
      res.status(200).json({ id, email, role })
    } else {
        next()
    }
  }
}

module.exports = publicController;