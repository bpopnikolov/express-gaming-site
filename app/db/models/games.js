'use strict';
module.exports = (sequelize, DataTypes) => {
  var Games = sequelize.define('Games', {
    name: DataTypes.STRING
  }, {});
  Games.associate = function(models) {
    // associations can be defined here
  };
  return Games;
};