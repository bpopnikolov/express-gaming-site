'use strict';
module.exports = (sequelize, DataTypes) => {
    const Platform = sequelize.define('Platform', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {});
    Platform.associate = (models) => {
        // associations can be defined here
    };
    return Platform;
};
