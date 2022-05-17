'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Measurement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Measurement.hasMany(models.Recipe, {
        foreignKey: 'MeasurementId'
      })
      // define association here
    }
  }
  Measurement.init({
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description name is required'
        },
        notEmpty: {
          msg: 'Description name cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Measurement',
  });
  return Measurement;
};