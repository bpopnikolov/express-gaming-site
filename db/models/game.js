/* eslint new-cap: 0 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        summary: {
            type: DataTypes.TEXT(),
            allowNull: false,
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: true,
            validate: {
                isNumeric: true,
            },
        },
        releaseDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
            },
        },
        cover: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            },
        },

    }, {});
    Game.associate = (models) => {
        // associations can be defined here
        const {
            GameMode,
            Genre,
            Platform,
            Publisher,
            Screenshot,
            Video,
            Website,
        } = models;

        Game.belongsToMany(GameMode, {
            through: 'game_gamemode',
            foreignKey: 'game_id',
            onDelete: 'CASCADE',
        });
        GameMode.belongsToMany(Game, {
            through: 'game_gamemode',
            foreignKey: 'gamemode_id',
        });

        Game.belongsToMany(Genre, {
            through: 'game_genre',
            foreignKey: 'game_id',
            onDelete: 'CASCADE',
        });
        Genre.belongsToMany(Game, {
            through: 'game_genre',
            foreignKey: 'genre_id',
        });

        Game.belongsToMany(Platform, {
            through: 'game_platform',
            foreignKey: 'game_id',
            onDelete: 'CASCADE',
        });
        Platform.belongsToMany(Game, {
            through: 'game_platform',
            foreignKey: 'platform_id',
        });

        Game.belongsToMany(Publisher, {
            through: 'game_publisher',
            foreignKey: 'game_id',
            onDelete: 'CASCADE',
        });
        Publisher.belongsToMany(Game, {
            through: 'game_publisher',
            foreignKey: 'publisher_id',
        });

        Game.hasMany(Screenshot, {
            foreignKey: {
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });

        Game.hasMany(Video, {
            foreignKey: {
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });

        Game.belongsToMany(Website, {
            through: 'game_website',
            foreignKey: 'game_id',
            onDelete: 'CASCADE',
        });
        Website.belongsToMany(Game, {
            through: 'game_website',
            foreignKey: 'website_id',
        });
    };
    return Game;
};
