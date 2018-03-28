/* eslint new-cap: 0 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT(),
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },

  }, {});
  Genre.hook('beforeValidate', (genre, options) => {
    if (!genre.logo) {
      genre.logo = '/public/assets/img/noImg.jpg';
    }
  });
  Genre.associate = (models) => {
    // associations can be defined here
  };
  return Genre;
};