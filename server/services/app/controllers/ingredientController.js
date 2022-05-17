const { Ingredient } = require('../models/index');

class IngredientController {
  static async editIngredient (req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!name) throw ({ name: 'IngredientBadRequest'})

      const ingredient = await Ingredient.findByPk(id)
      if (!ingredient) throw ({ name: 'IngredientNotFound' })

      const editedIngredient = await Ingredient.update({
        name
      }, {
        where: {
          id: id
        },
        returning: true
      })

      res.status(200).json(editedIngredient[1][0]);
    } catch (error) {
      next(error)
    }
  }

  static async viewAllIngredients (req, res, next) {
    try {
      const ingredients = await Ingredient.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })
      res.status(200).json(ingredients);
    } catch (error) {
      next(error)
    }
  }

  static async viewIngredient (req, res, next) {
    try {
      const { id } = req.params;
      const ingredient = await Ingredient.findByPk(id, {
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })
      res.status(200).json(ingredient);
    } catch (error) {
      next(error)
    }
  }

  static async createIngredient (req, res, next) {
    try {
      const { name } = req.body;
      const newIngredient = await Ingredient.create({ name });
      
      res.status(201).json(newIngredient);
    } catch (error) {
      next(error)
    }
  }

  static async deleteIngredient (req, res, next) {
    try {
      const { id } = req.params;
      const ingredient = await Ingredient.findByPk(id);
      if (!ingredient) throw ({ name: 'IngredientNotFound' });
      
      if (req.user.role !== 'Admin') throw ({ name: 'Forbidden' });
      const deleteIngredient = await Ingredient.destroy({
        where: {
          id: id
        }
      })
      
      res.status(200).json({ message: 'Ingredient has been deleted' });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = IngredientController;