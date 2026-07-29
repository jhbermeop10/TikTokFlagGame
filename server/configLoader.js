const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "../config/gifts.json");

function loadGiftConfig() {

    return JSON.parse(
        fs.readFileSync(configPath, "utf8")
    );

}

module.exports = {
    loadGiftConfig
};