module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint('UserGameRatings', ['userId', 'gameId'], {
            type: 'unique',
            name: 'composite_game_user_rating'
        });;
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint('UserGameRatings', 'composite_game_user_rating', {
            force: true,
        });
    }
};
