'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MyOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
        type: Sequelize.STRING,
        // references: {
        //   model: 'Users',
        //   key: 'id'
        // },
        // onDelete: 'Cascade',
        // onUpdate: 'Cascade'
      },
      MenuId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Menus',
          key: 'id'
        },
        onDelete: 'Cascade',
        onUpdate: 'Cascade'
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MyOrders');
  }
};