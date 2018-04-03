// const {
//     expect,
// } = require('chai');

// const Controller = require('../../app/controllers/games.controller');

// let gamesArray = [];
// let ratingsArray = [];
// // const gameObj = {
// //     id,
// // };
// // const objToCheck = {
// //     GameId: +gameObj.id,
// //     UserId: +user.id,
// // };
// // const ratingObj = {
// //     rating: +rating,
// //     GameId: +gameObj.id,
// //     UserId: +user.id,
// // };

// const fakeData = {
//     games: {
//         getByName(gameName) {
//             const gameObj = gamesArray.find((game) => game.name === gameName);
//             return gameObj;
//         },
//         getGameUserRating(user, gameObj) {
//             return gameObj.find((rating) =>
//                 (rating.userId === user.id && rating.gameId === gameObj.id));
//         },
//         setGameRating(user, gameObj, rating) {
//             ratingsArray.push({
//                 rating: +rating,
//                 GameId: +gameObj.id,
//                 UserId: +user.id,
//             });
//             return ratingsArray;
//         },

//     },
//     ratings: {
//         getAllGameatings(gameId) {
//             // const ratingObj = ratingsArray.
//             //     filter((gameRatings) => gameRatings.gameId === gameId);
//             // return ratingObj;
//             return ratingsArray;
//         },
//         getGameRatingByUserIdAndGameId(objToCheck) {
//             return ratingsArray.find((rating) =>
//                 (rating.userId === objToCheck.UserId &&
//                     rating.gameId === objToCheck.GameId));
//         },
//         updateExistingRating(savedRating, ratingObj) {
//             const ratingToBeChanged = ratingsArray.find((rating) =>
//                 (rating.userId === ratingObj.UserId &&
//                     rating.gameId === ratingObj.GameId));

//             const index = ratingsArray.indexOf(ratingToBeChanged);
//             if (index > -1) {
//                 ratingsArray[index] = savedRating;
//             } else {
//                 ratingsArray.push({
//                     rating: savedRating,
//                     GameId: ratingObj.GameId,
//                     UserId: ratingObj.UserId,
//                 });
//             }
//             return ratingsArray;
//         },
//         create(ratingObj) {
//             ratingsArray.push({
//                 rating: ratingObj.rating,
//                 GameId: ratingObj.GameId,
//                 UserId: ratingObj.UserId,
//             });
//         },
//     },
// };

// describe('GamesController', () => {
//     describe('getByName(gameName)', () => {

//         const gameName = 'Test';

//         it('when no games, expect empty object', async () => {
//             // Arrange
//             gamesArray = [{}];
//             const controller = new Controller(fakeData);

//             // Act
//             const gameFound = await controller.getByName(gameName);

//             // Assert
//             expect(gameFound).to.be.empty;
//         });
//         it('when no such game, expect empty object', async () => {
//             // Arrange
//             gamesArray = [{
//                 name: 'wrongName',
//             }];
//             const controller = new Controller(fakeData);

//             // Act
//             const gameFound = await controller.getByName(gameName);

//             // Assert
//             expect(gameFound).to.be.empty;
//         });
//         it('when game exists, expect game object', async () => {
//             // Arrange
//             gamesArray = [{
//                 id: 1,
//                 name: gameName,
//                 rating: 10,
//                 ratingCount: 1,
//                 releaseDate: '',
//                 cover: [],
//             }];
//             ratingsArray = [{
//                 gameId: 1,
//                 rating: [],
//             }];
//             const controller = new Controller(fakeData);

//             // Act
//             const gameFound = await controller.getByName(gameName);

//             // Assert
//             expect(gameFound.name).to.be.eq(gameName);
//         });
//     });
// });
