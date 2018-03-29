/* eslint new-cap: 0 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Publisher = sequelize.define('Publisher', {
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
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  }, {});

  Publisher.hook('beforeValidate', (publisher, options) => {
    if (!publisher.logo) {
      publisher.logo = '/public/assets/img/noImg.jpg';
    }
  });

  Publisher.associate = (models) => {
    // associations can be defined here
  };
  return Publisher;
};
