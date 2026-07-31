const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "../config/game.json");

let config = {};

function loadGameConfig(){

    config = JSON.parse(
        fs.readFileSync(configPath,"utf8")
    );

    return config;

}

function getGameConfig(){

    return config;

}

module.exports = {

    loadGameConfig,

    getGameConfig

};