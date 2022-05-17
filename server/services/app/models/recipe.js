'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Recipe.belongsTo(models.Ingredient, {
        foreignKey: 'IngredientId'
      })
      Recipe.belongsTo(models.Measurement, {
        foreignKey: 'MeasurementId'
      })
      Recipe.belongsTo(models.Menu, {
        foreignKey: 'MenuId'
      })
      // define association here
    }
  }
  Recipe.init({
    MenuId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    IngredientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    MeasurementId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};