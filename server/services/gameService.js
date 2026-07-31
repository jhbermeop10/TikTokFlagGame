const state = require("../state");
const config = require("../config");

function addProgress(points) {

    state.progress += points;

    if (state.progress > config.goal) {

        state.progress = config.goal;

    }

}

function resetGame() {

    state.progress = 0;
    state.lastGift = null;
    state.lastUser = null;
    state.lastPoints = 0;

}

function getState() {

    return state;

}

module.exports = {

    addProgress,
    resetGame,
    getState

};