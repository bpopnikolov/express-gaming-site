/* eslint new-cap: 0 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        isNumeric: true,
      },
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },

  }, {});
  Game.associate = (models) => {
    // associations can be defined here
  };
  return Game;
};
