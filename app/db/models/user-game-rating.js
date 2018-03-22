'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserGameRating = sequelize.define('UserGameRating', {
        rating: {
            type: DataTypes.FLOAT,
            validate: {
                isNumeric: true,
            },
        },
    }, {});
    UserGameRating.associate = (models) => {
        // associations can be defined here
    };
    return UserGameRating;
};
