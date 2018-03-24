module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint('UserGameReviews', ['userId', 'gameId'], {
            type: 'unique',
            name: 'composite_review_index'
        });;
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint('UserGameReviews', 'composite_review_index', {
            force: true,
        });
    }
};
