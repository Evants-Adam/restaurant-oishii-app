'use strict';
const measurementsData = require('../assets/measurements.json');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Measurements', measurementsData.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();

      return el;
    }), [])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Measurements', null, {
      restartIdentity: true
    })
  }
};
