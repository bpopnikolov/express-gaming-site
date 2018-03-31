/* eslint new-cap: 0 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

  }, {});

  Genre.associate = (models) => {
    // associations can be defined here
  };
  return Genre;
};
