'use strict';
module.exports = (sequelize, DataTypes) => {
    const Screenshot = sequelize.define('Screenshot', {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            },
            unique: true,
        },
    }, {});
    Screenshot.associate = (models) => {
        // associations can be defined here
    };
    return Screenshot;
};
