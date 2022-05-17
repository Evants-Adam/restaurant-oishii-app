'use strict';
const categoriesData = require('../assets/categories.json');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', categoriesData.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();

      return el;
    }), [])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {
      restartIdentity: true
    })
  }
};
