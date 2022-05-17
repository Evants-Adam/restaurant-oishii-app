'use strict';
const menusData = require('../assets/menus.json');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Menus', menusData.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();

      return el;
    }), [])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Menus', null, {
      restartIdentity: true
    })
  }
};
