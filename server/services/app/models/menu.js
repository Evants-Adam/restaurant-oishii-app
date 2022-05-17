'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Menu.hasMany(models.Recipe, {
        foreignKey: 'MenuId'
      })
      Menu.hasMany(models.MyOrder, {
        foreignKey: 'MenuId'
      })
      Menu.belongsTo(models.Categories, {
        foreignKey: 'CategoryId'
      })
    }
  }
  Menu.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name is required'
        },
        notEmpty: {
          msg: 'Name cannot be empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description is required'
        },
        notEmpty: {
          msg: 'Description cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price is required'
        },
        notEmpty: {
          msg: 'Price cannot be empty'
        },
        min: {
          args: 5000,
          msg: 'Price cannot be lower than Rp. 5000,-'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Image URL is required'
        },
        notEmpty: {
          msg: 'Image URL cannot be empty'
        }
      }
    },
    UserId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};