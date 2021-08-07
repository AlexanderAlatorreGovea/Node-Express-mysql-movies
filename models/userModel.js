const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: { 
        type: DataTypes.STRING,
      },
    }, 
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
