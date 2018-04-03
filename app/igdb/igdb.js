const gamesApi = require('./games/games');
const {
    parseGame,
    parseGameMode,
    parseGenre,
    parsePlatform,
    parsePublisher,
    parseScreenshot,
    parseVideo,
    parseWebsite,
} = require('./parsers/parsers');

const dbWrapper = require('../database-wrapper');


const getAllGames = async (limit) => {
    let allGames = await gamesApi.fetchAllGames(0, limit, 0, []);

    allGames = allGames.reduce((a, b) => a.concat(b), []);

    return allGames;
};

const addGamesToDatabase = async (games) => {
    await Promise.all(games.map(async (gameObj) => {
        const game = parseGame(gameObj);

        let publishers = [];
        if (gameObj.publishers) {
            publishers = gameObj.publishers.map((publisher) =>
                parsePublisher(publisher));
        }

        let genres = [];
        if (gameObj.genres) {
            genres = gameObj.genres.map((genre) =>
                parseGenre(genre));
        }


        let gameModes = [];
        if (gameObj.game_modes) {
            gameModes = gameObj.game_modes.map((gameMode) =>
                parseGameMode(gameMode));
        }

        let websites = [];
        if (gameObj.websites) {
            websites = gameObj.websites.map((website) =>
                parseWebsite(website));
        }

        let platforms = [];
        if (gameObj.platforms) {
            platforms = gameObj.platforms.map((platform) =>
                parsePlatform(platform));
        }

        let screenshots = [];
        if (gameObj.screenshots) {
            screenshots = gameObj.screenshots.map((screenshot) =>
                parseScreenshot(screenshot));
        }

        let videos = [];
        if (gameObj.videos) {
            videos = gameObj.videos.map((video) =>
                parseVideo(video));
        }

        let savedPublishers = await Promise.all(
            publishers.map((publisher) => {
                return dbWrapper.publishers.findOrCreate(publisher);
            }));
        // console.log(savedPublishers);
        savedPublishers = savedPublishers.map((publisher) => publisher[0].id);

        let savedGenres = await Promise.all(
            genres.map((genre) => {
                return dbWrapper.genres.findOrCreate(genre);
            }));

        savedGenres = savedGenres.map((genre) => genre[0].id);

        let savedGameModes = await Promise.all(
            gameModes.map((gameMode) => {
                return dbWrapper.gameModes.findOrCreate(gameMode);
            }));

        savedGameModes = savedGameModes.map((gameMode) => gameMode[0].id);

        let savedWebsites = await Promise.all(
            websites.map((website) => {
                return dbWrapper.websites.findOrCreate(website);
            }));

        savedWebsites = savedWebsites.map((website) => website[0].id);

        let savedPlatforms = await Promise.all(
            platforms.map((platform) => {
                return dbWrapper.platforms.findOrCreate(platform);
            }));

        savedPlatforms = savedPlatforms.map((platform) => platform[0].id);


        const savedGame = await dbWrapper.games.findOrCreate(game);


        const savedScreenshots = await Promise.all(
            screenshots.map((screenshot) => {
                screenshot.GameId = savedGame[0].id;
                return dbWrapper.screenshots.findOrCreate(screenshot);
            }));

        const savedVideos = await Promise.all(
            videos.map((video) => {
                video.GameId = savedGame[0].id;
                return dbWrapper.videos.findOrCreate(video);
            }));

        // console.log(savedGame);
        savedGame[0].setPublishers(savedPublishers);
        savedGame[0].setGenres(savedGenres);
        savedGame[0].setGameModes(savedGameModes);
        savedGame[0].setWebsites(savedWebsites);
        savedGame[0].setPlatforms(savedPlatforms);

        return savedGame[0];
    })).catch((err) => console.log(err));
};

const run = async () => {
    const games = await getAllGames(50);
    await addGamesToDatabase(games);
    console.log('Games were added to database.');
};

run();

module.exports = {
    getAllGames,
};
