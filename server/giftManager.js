const socketManager = require("./socket");

const state = require("./state");
const config = require("./config");

const { loadGiftConfig } = require("./configLoader");

const gifts = loadGiftConfig();

function addGift(user, giftName) {

    const gift = gifts[giftName];

if (!gift) {

    console.log("Regalo sin configurar:", giftName);

    return state;

}

const value = gift.points;

    state.progress += value;

    if (state.progress >= config.goal) {

        state.progress = config.goal;

        console.log("🎉 META COMPLETADA");

        setTimeout(() => {

            state.progress = 0;
            state.lastGift = null;
            state.lastUser = null;

            socketManager.broadcastGameState(state);

        }, 5000);

    }

    state.lastUser = user;
    state.lastGift = giftName;

    socketManager.broadcastGameState(state);

    return state;
}

module.exports = {
    addGift
};