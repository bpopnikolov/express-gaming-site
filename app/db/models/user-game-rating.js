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

        const {
            User,
            Game,
        } = models;

        UserGameRating.belongsTo(Game, {
            foreignKey: {
                unique: 'composite_game_user_rating',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });

        UserGameRating.belongsTo(User, {
            foreignKey: {
                unique: 'composite_game_user_rating',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });
    };
    return UserGameRating;
};
