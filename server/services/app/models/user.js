'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/hash');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User.hasMany(models.MyOrder, {
      //   foreignKey: 'UserId'
      // })
      // User.hasMany(models.Menu, {
      //   foreignKey: 'UserId'
      // })
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email cannot be empty'
        },
        isEmail: {
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: 'Password cannot be empty'
        },
        len: {
          args: 5,
          msg: 'Password minimum length is 6'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Role is required'
        },
        notEmpty: {
          msg: 'Role cannot be empty'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Phone Number is required'
        },
        notEmpty: {
          msg: 'Phone Number cannot be empty'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Address is required'
        },
        notEmpty: {
          msg: 'Address cannot be empty'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  // User.beforeCreate((instanceUser) => {
  //   instanceUser.password = hashPassword(instanceUser.password)
  // })
  return User;
};