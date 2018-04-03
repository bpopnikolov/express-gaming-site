const {
    expect,
} = require('chai');

const RatingsDbWrapper =
    require('../../app/database-wrapper/ratings.db.wrapper');

describe('ratingsDbWrapper', () => {
    describe('findOne', () => {
        describe('When valid', () => {
            it('returns object with gameId and userId', async () => {
                const id = 1;
                const id1 = 1;
                const object = {
                    id,
                    id1,
                };
                const Model = {
                    findOne: (game, user) => object,
                };
                const data = new RatingsDbWrapper(Model);
                const game = {
                    id,
                };
                const user = {
                    id1,
                };


                const result = await data.findOne(game, user);

                expect(result).deep.equal(object);
            });
        });
    });

    describe('getGameRatingByUserIdAndGameId', () => {
        describe('When valid', () => {
            it('returns object with gameId and userId', async () => {
                const object = {
                    gameId: 1,
                    userId: 1,
                };
                const Model = {
                    getGameRatingByUserIdAndGameId: (obj) => object,
                };
                
                const data = new RatingsDbWrapper(Model);

                const result = await data.getGameRatingByUserIdAndGameId(object);

                expect(result).deep.equal(object);
            });
        });
    });
});
