const GameModesDbWrapper = require('./gamemodes.db.wrapper');
const GamesDbWrapper = require('./games.db.wrapper');
const GenresDbWrapper = require('./genres.db.wrapper');
const PlatformsDbWrapper = require('./platforms.db.wrapper');
const PublishersDbWrapper = require('./publishers.db.wrapper');
const ScreenshotsDbWrapper = require('./screenshots.db.wrapper');
const VideosDbWrapper = require('./videos.db.wrapper');
const WebsitesDbWrapper = require('./websites.db.wrapper');
const UsersDbWrapper = require('./users.db.wrapper');
const RatingsDbWrapper = require('./ratings.db.wrapper');

module.exports = {
    gameModes: new GameModesDbWrapper(),
    games: new GamesDbWrapper(),
    genres: new GenresDbWrapper(),
    platforms: new PlatformsDbWrapper(),
    publishers: new PublishersDbWrapper(),
    screenshots: new ScreenshotsDbWrapper(),
    videos: new VideosDbWrapper(),
    websites: new WebsitesDbWrapper(),
    users: new UsersDbWrapper(),
    ratings: new RatingsDbWrapper(),
};
