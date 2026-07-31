const { getGameConfig } = require("./gameConfig");

const config = getGameConfig();

const gameState = {

    progress: 0,

    goal: config.goal,

    country: config.country,

    title: config.title,

    flag: config.flag,

    lastGift: null,

    lastUser: null,

    lastPoints: 0,

    ranking: []

};

module.exports = gameState;