'use strict';
module.exports = (sequelize, DataTypes) => {
    const Platform = sequelize.define('Platform', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {});
    Platform.associate = (models) => {
        // associations can be defined here
    };
    return Platform;
};
