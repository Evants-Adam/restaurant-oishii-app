const MenuController = require('../controllers/menuController');
const RecipeController = require('../controllers/recipeController');

const menuRouter = require('express').Router();

// *Available API*
menuRouter.get('/', MenuController.viewAllMenus);
menuRouter.post('/', MenuController.postMenu);
menuRouter.delete('/:id', MenuController.deleteMenu);
menuRouter.put('/:id', MenuController.editMenu);
menuRouter.patch('/:id', MenuController.patchMenu);
menuRouter.get('/:id', MenuController.viewOneMenu);
menuRouter.get('/:id/recipe', RecipeController.getAllRecipes);

module.exports = menuRouter;