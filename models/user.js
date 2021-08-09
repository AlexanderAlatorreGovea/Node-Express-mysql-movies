"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a name' },
          notEmpty: { msg: 'Name must not be empty' },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a last name' },
          notEmpty: { msg: 'Last name must not be empty' },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          notNull: { msg: 'User must have an email'},
          notNull: { msg: 'Email must not be empty'},
          isEmail: { msg: 'Must be a valid email address' },
        }
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
