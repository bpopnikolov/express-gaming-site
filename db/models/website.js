'use strict';
module.exports = (sequelize, DataTypes) => {
    const Website = sequelize.define('Website', {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {});
    Website.associate = (models) => {
        // associations can be defined here
    };
    return Website;
};
