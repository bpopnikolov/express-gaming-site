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
        const {
            User,
            Game,
            UserGameRating,
        } = models;

        UserGameReview.belongsTo(Game, {
            foreignKey: {
                unique: 'composite_review_index',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });

        UserGameReview.belongsTo(User, {
            foreignKey: {
                unique: 'composite_review_index',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });
    };
    return UserGameReview;
};
