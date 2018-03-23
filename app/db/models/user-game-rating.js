'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserGameRating = sequelize.define('UserGameRating', {
        rating: {
            type: DataTypes.FLOAT,
            validate: {
                isNumeric: true,
            },
        },
        /* userId: {
            type: DataTypes.INTEGER,
            unique: 'compositeIndex',
        },
        gameId: {
            type: DataTypes.INTEGER,
            unique: 'compositeIndex',
        },*/

    }, {});
    UserGameRating.associate = (models) => {
        // associations can be defined here
    };
    return UserGameRating;
};
