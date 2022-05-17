const { Menu, Recipe, User, Ingredient, Measurement } = require('../models/index');

class RecipeController {
  static async getAllRecipes (req, res, next) {
    try {
      const { id } = req.params;
      const recipes = await Recipe.findAll({
        where: {
          MenuId: id
        },
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
      })

      res.status(200).json(recipes)
    } catch (error) {
      next(error)
    }
  }

  static async getRecipe (req, res, next) {
    try {
      const { id } = req.params;
      const recipe = await Recipe.findByPk(id, {
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
      })

      if (!recipe) throw ({ name: 'RecipeNotFound' })

      res.status(200).json(recipe)
    } catch (error) {
      next(error)
    }
  }

  static async postRecipe (req, res, next) {
    try {
      const { MenuId, IngredientId, quantity, MeasurementId } = req.body;

      if (!IngredientId || !MeasurementId || IngredientId === '#' || MeasurementId === '#') throw ({ name: 'PostRecipeBadRequest' })

      if (!quantity || quantity < 0) throw ({ name: 'QuantityBadRequest'})
      
      const menu = await Menu.findByPk(MenuId)
      if (!menu) throw ({ name: 'MenuNotFound' })

      const ingredient = await Ingredient.findByPk(IngredientId)
      if (!ingredient) throw ({ name: 'IngredientNotFound' })

      const measurement = await Measurement.findByPk(MeasurementId)
      if (!measurement) throw ({ name: 'MeasurementNotFound' })

      const recipe = await Recipe.create({
        MenuId, IngredientId, quantity, MeasurementId
      })

      res.status(201).json(recipe)
    } catch (error) {
      next(error)
    }
  }

  static async deleteRecipe (req, res, next) {
    try {
      const { id } = req.params;
      const recipe = await Recipe.findByPk(id);
      if (!recipe) throw ({ name: 'RecipeNotFound' });

      if (req.user.role !== 'Admin') throw ({ name: 'Forbidden' })
      const deletedRecipe = await Recipe.destroy({
        where: {
          id: id
        }
      });

      res.status(200).json({ message: 'Recipe has been deleted' });
    } catch (error) {
      next(error)
    }
  }

  static async editRecipe (req, res, next) {
    try {
      const { id } = req.params;
      const { MenuId, IngredientId, MeasurementId, quantity } = req.body;

      if (!quantity || quantity < 0) throw ({ name: 'QuantityBadRequest'})

      const recipe = await Recipe.findByPk(id);
      if (!recipe) throw ({ name: 'RecipeNotFound' });

      const menu = await Menu.findByPk(MenuId)
      if (!menu) throw ({ name: 'MenuNotFound' })

      const ingredient = await Ingredient.findByPk(IngredientId)
      if (!ingredient) throw ({ name: 'IngredientNotFound' })

      const measurement = await Measurement.findByPk(MeasurementId)
      if (!measurement) throw ({ name: 'MeasurementNotFound' })

      const editedRecipe = await Recipe.update({
        IngredientId, MeasurementId, quantity
      }, {
        where: {
          id: id
        },
        returning: true
      })

      res.status(200).json(editedRecipe[1][0]);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = RecipeController;