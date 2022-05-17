const { Categories } = require('../models/index');

class CategoriesController {
  static async viewAllCategories (req, res, next) {
    try {
      const categories = await Categories.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })
      res.status(200).json(categories);
    } catch (error) {
      next(error)
    }
  }

  static async viewCategory (req, res, next) {
    try {
      const { id } = req.params;
      const categories = await Categories.findByPk(id, {
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })
      res.status(200).json(categories);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CategoriesController;