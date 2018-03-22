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
      validate: {
        isUrl: true,
      },
    },
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },

  }, {});
  Publisher.associate = (models) => {
    // associations can be defined here
  };
  return Publisher;
};
