const socketManager = require("./socket");
const gameEngine = require("./services/gameEngine");

function addGift(user, giftName) {

    const state = gameEngine.processGift(
        user,
        giftName
    );

    socketManager.broadcastGameState(state);

    return state;

}

module.exports = {

    addGift

};