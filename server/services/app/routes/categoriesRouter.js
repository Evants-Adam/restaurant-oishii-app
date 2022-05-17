const CategoriesController = require('../controllers/categoriesController');

const categoriesRouter = require('express').Router();

// *Available API*
categoriesRouter.get('/', CategoriesController.viewAllCategories);
categoriesRouter.get('/:id', CategoriesController.viewCategory);

module.exports = categoriesRouter;