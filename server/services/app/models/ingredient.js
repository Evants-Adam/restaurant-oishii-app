'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ingredient.hasMany(models.Recipe, {
        foreignKey: 'IngredientId'
      })
      // define association here
    }
  }
  Ingredient.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Ingredient name is required'
        },
        notEmpty: {
          msg: 'Ingredient name cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Ingredient',
  });
  return Ingredient;
};