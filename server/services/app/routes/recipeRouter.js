const RecipeController = require('../controllers/recipeController');

const recipeRouter = require('express').Router();

// *Available API*
recipeRouter.post('/', RecipeController.postRecipe);
recipeRouter.get('/:id', RecipeController.getRecipe);
recipeRouter.delete('/:id', RecipeController.deleteRecipe);
recipeRouter.put('/:id', RecipeController.editRecipe);

module.exports = recipeRouter;