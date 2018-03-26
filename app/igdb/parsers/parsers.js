const parseGame = (obj) => {
    let coverUrl = '';
    if (obj.cover) {
        coverUrl = `http:${obj.cover.url}`;
    }
    return {
        name: obj.name,
        summary: obj.summary || '',
        rating: 0,
        ratingCount: 0,
        releaseDate: obj.first_release_date || new Date(0),
        cover: coverUrl || '/public/assets/img/noImg.jpg',
    };
};

const parsePublisher = (obj) => {
    let url = '';
    if (obj.logo) {
        url = `http:${obj.logo.url}`;
    }

    return {
        name: obj.name,
        logo: url || '/public/assets/img/noImg.jpg',
        description: obj.description || '',
        website: obj.website || '',
    };
};

const parseGenre = (obj) => {
    return {
        name: obj.name || '',
    };
};

const parseGameMode = (obj) => {
    return {
        name: obj.name || '',
    };
};


const parseWebsite = (obj) => {
    let url = '';
    if (obj.url) {
        url = `http:${obj.url}`;
    }
    return {
        url: url,
    };
};

const parsePlatform = (obj) => {
    // console.log('---------------------------');
    // console.log(obj);
    // console.log('---------------------------');
    return {
        name: obj.name || '',
    };
};

const parseScreenshot = (obj) => {
    let url = '';
    if (obj.url) {
        url = `http:${obj.url}`;
    }
    return {
        url: url,
    };
};

const parseVideo = (obj) => {
    let url = '';
    if (obj.url) {
        url = `http:${obj.url}`;
    }
    return {
        url: url,
    };
};


module.exports = {
    parseGame,
    parseGameMode,
    parseGenre,
    parsePlatform,
    parsePublisher,
    parseScreenshot,
    parseVideo,
    parseWebsite,
};
