'use strict';
module.exports = (sequelize, DataTypes) => {
    const Video = sequelize.define('Video', {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            },
        },
    }, {});
    Video.associate = (models) => {
        // associations can be defined here
    };
    return Video;
};
