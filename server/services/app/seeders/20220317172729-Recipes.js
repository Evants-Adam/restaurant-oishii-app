'use strict';
const recipesData = require('../assets/recipes.json');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Recipes', recipesData.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();

      return el;
    }), [])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Recipes', null, {
      restartIdentity: true
    })
  }
};
