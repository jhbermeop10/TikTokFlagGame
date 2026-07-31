const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "../config/gifts.json");

let gifts = {};

function loadGiftConfig() {

    gifts = JSON.parse(
        fs.readFileSync(configPath, "utf8")
    );

    return gifts;

}

function getGift(name) {

    return gifts[name] || null;

}

module.exports = {

    loadGiftConfig,

    getGift

};