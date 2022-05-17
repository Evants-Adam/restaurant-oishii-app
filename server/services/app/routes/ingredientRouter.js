const IngredientController = require('../controllers/ingredientController');

const ingredientRouter = require('express').Router();

// *Available API*
ingredientRouter.get('/', IngredientController.viewAllIngredients);
ingredientRouter.post('/', IngredientController.createIngredient);
ingredientRouter.get('/:id', IngredientController.viewIngredient);
ingredientRouter.delete('/:id', IngredientController.deleteIngredient);
ingredientRouter.put('/:id', IngredientController.editIngredient);

module.exports = ingredientRouter;