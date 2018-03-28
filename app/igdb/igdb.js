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

        const savedGame = await dbWrapper.games.create(game);
        console.log(savedGame);
        savedGame.setPublishers(publishers);
        savedGame.setGenres(genres);
        savedGame.setGameModes(gameModes);
        savedGame.setWebsites(websites);
        savedGame.setPlatforms(platforms);
        savedGame.setScreenshots(screenshots);
        savedGame.setVideos(videos);
        return savedGame;
    })).catch((err) => console.log(err));
};

const run = async () => {
    const games = await getAllGames(1);
    // console.log(Array.isArray(games));
    await addGamesToDatabase(games);
};

run();

module.exports = {
    getAllGames,
};
