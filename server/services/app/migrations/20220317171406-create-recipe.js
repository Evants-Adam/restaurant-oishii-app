'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      IngredientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Ingredients',
          key: 'id'
        },
        onDelete: 'Cascade',
        onUpdate: 'Cascade'
      },
      quantity: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
      },
      MeasurementId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Measurements',
          key: 'id'
        },
        onDelete: 'Cascade',
        onUpdate: 'Cascade'
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
    await queryInterface.dropTable('Recipes');
  }
};