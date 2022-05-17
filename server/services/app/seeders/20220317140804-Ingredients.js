'use strict';
const ingredientsData = require('../assets/ingredients.json');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ingredients', ingredientsData.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();

      return el;
    }), [])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ingredients', null, {
      restartIdentity: true
    })
  }
};
