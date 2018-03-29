'use strict';
module.exports = (sequelize, DataTypes) => {
  const GameMode = sequelize.define('GameMode', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

  }, {});
  GameMode.associate = (models) => {
    // associations can be defined here
  };
  return GameMode;
};
