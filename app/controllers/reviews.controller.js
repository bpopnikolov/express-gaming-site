class ReviewsController {
    constructor(dbWrapper) {
        this.dbWrapper = dbWrapper;
    }

    async userCanGiveGameReview(user, game) {
        const canReview = await this.dbWrapper.ratings.findOne(user, game);
        console.log(canReview);
        if (!canReview) {
            console.log('rating not found');
            return false;
        }

        console.log('rating found');
        return true;
    }

    async getAllGameReviews(gameName) {
        const game = await this.dbWrapper.games.getByName(gameName);

        if (!game) {
            return null;
        }

        const reviews = this.dbWrapper.reviews.getAllGameReviews(game);

        if (reviews.length < 0) {
            return [];
        }

        return reviews;
    }

    async addUserReview(user, gameName, review) {
        const game = await this.dbWrapper.games.getByName(gameName);

        if (!game) {
            return null;
        }
        console.log(game);
        console.log('CHECK IF CAN REVIEW');
        const canReview = await this.userCanGiveGameReview(user, game);

        if (!canReview) {
            console.log('cant review');
            return null;
        }

        console.log('CAN REVIEW');

        const reviewObj = await this.dbWrapper.reviews.findOrCreate(
            user, game, review);

        if (!reviewObj) {
            return null;
        }
        console.log('review sent');
        return reviewObj;
    }
}

module.exports = ReviewsController;
