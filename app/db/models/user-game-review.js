/* eslint new-cap: 0 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserGameReview = sequelize.define('UserGameReview', {
        review: {
            type: DataTypes.TEXT(),
            allowNull: false,
        },
    }, {});
    UserGameReview.associate = (models) => {
        // associations can be defined here
    };
    return UserGameReview;
};
