'use strict';

const { hashPassword } = require("../helpers/hash");

module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('Users', [
    //   {
    //     email: "admin.user.1@mail.com",
    //     password: hashPassword("adminuser1@12345"),
    //     role: "Admin",
    //     phoneNumber: "08999808080",
    //     address: "Jakarta",
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     email: "admin-super@mail.com",
    //     password: hashPassword("admin-super"),
    //     role: "Admin",
    //     phoneNumber: "08999808080",
    //     address: "Jakarta",
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   }
    // ], {})
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('Users', null, {
    //   restartIdentity: true
    // })
  }
};
