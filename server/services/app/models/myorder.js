'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // MyOrder.belongsTo(models.User, {
      //   foreignKey: 'UserId'
      // })
      MyOrder.belongsTo(models.Menu, {
        foreignKey: 'MenuId'
      })
      // define association here
    }
  }
  MyOrder.init({
    UserId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    MenuId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    quantity:  {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: 'Quantity is required'
        },
        notEmpty: {
          msg: 'Quantity cannot be empty'
        },
        min: {
          args: 1,
          msg: 'Minimum order is 1'
        }
      }
    },
    totalPrice: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'MyOrder',
  });
  return MyOrder;
};