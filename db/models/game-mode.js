'use strict';
module.exports = (sequelize, DataTypes) => {
  const GameMode = sequelize.define('GameMode', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {});
  GameMode.associate = (models) => {
    // associations can be defined here
  };
  return GameMode;
};
