/* eslint new-cap: 0 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserGameRating = sequelize.define('UserGameReview', {
        review: {
            type: DataTypes.TEXT('large'),
            allowNull: false,
        },
    }, {});
    UserGameRating.associate = (models) => {
        // associations can be defined here
    };
    return UserGameRating;
};
