const { Op } = require('sequelize');
const { Menu, Categories, Recipe, Ingredient, Measurement, MyOrder, sequelize } = require('../models/index');

class MenuController {
  static async viewAllMenus (req, res, next) {
    try {
      const menus = await Menu.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [
          { 
            model: Categories,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          },
          { 
            model: Recipe,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
              {
              model: Ingredient,
              attributes: { exclude: ['createdAt', 'updatedAt'] }
              },
              {
              model: Measurement,
              attributes: { exclude: ['createdAt', 'updatedAt'] } 
              }
            ]
          }
        ]
      })

      res.status(200).json(menus)
    } catch (error) {
      next(error)
    }
  }

  static async postMenu (req, res, next) {
    try {
      const { name, description, price, imgUrl, CategoryId } = req.body;

      const menu = await Menu.create({
        name, description, price, imgUrl, CategoryId, UserId: req.user.id, stock: 0
      })

      res.status(201).json(menu)
    } catch (error) {
      next(error)
    }
  }

  static async deleteMenu (req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { id } = req.params;

      const menu = await Menu.findByPk(id);
      if (!menu) throw ({ name: 'MenuNotFound' });

      // if (menu.UserId !== req.user.id && req.user.role !== 'Admin') throw ({ name: 'Forbidden' });
      // if (menu.UserId !== req.user.id && req.user.role !== 'Admin') throw ({ name: 'Forbidden' });
      const order = await MyOrder.findAll({
        where: {
          [Op.and]: {
            MenuId: id,
            status: 'Open'
          }
        }
      }, { transaction: t })
      
      if (order.length > 0) throw ({ name: 'CannotDeleteMenu' })

      const deletedMenu = await Menu.destroy({
        where: {
          id: id
        }
      }, { transaction: t })

      await t.commit()
      res.status(200).json({ message: 'Menu has been deleted!' })
    } catch (error) {
      await t.rollback()
      next(error)
    }
  }

  static async editMenu (req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, imgUrl, CategoryId, stock } = req.body;

      const menu = await Menu.findByPk(id);
      if (!menu) throw ({ name: 'MenuNotFound' });

      // if (menu.UserId !== req.user.id && req.user.role !== 'Admin') throw ({ name: 'Forbidden' });

      const editedMenu = await Menu.update({
        name, description, price, imgUrl, CategoryId, stock
      },{
        where: {
          id: id
        },
        returning: true
      })

      res.status(200).json(editedMenu[1][0]);
    } catch (error) {
      next(error)
    }
  }

  static async patchMenu (req, res, next) {
    try {
      const { id } = req.params;
      const { stock } = req.body;

      const menu = await Menu.findByPk(id);
      if (!menu) throw ({ name: 'MenuNotFound' });

      const editedMenu = await Menu.update({
        stock: Number(menu.stock) + Number(stock)
      },{
        where: {
          id: id
        },
        returning: true
      })

      res.status(200).json(editedMenu[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async viewOneMenu (req, res, next) {
    try {
      const { id } = req.params;

      const menu = await Menu.findOne({
        where: { id: id },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [
          { 
            model: Categories,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          },
          { 
            model: Recipe,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
              {
              model: Ingredient,
              attributes: { exclude: ['createdAt', 'updatedAt'] }
              },
              {
              model: Measurement,
              attributes: { exclude: ['createdAt', 'updatedAt'] } 
              }
            ]
          }
        ]
      })

      if (!menu) throw ({ name: 'MenuNotFound' })

      res.status(200).json(menu)
    } catch (error) {
      next(error)
    }
  }

}

module.exports = MenuController;