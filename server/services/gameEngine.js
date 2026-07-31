const state = require("../state");
const config = require("../config");

const rankingService = require("./rankingService");
const socketManager = require("../socket");

const { getGift } = require("../configLoader");

// Cargar la configuración al iniciar
require("../configLoader").loadGiftConfig();

function processGift(user, giftName) {

    const gift = getGift(giftName);

    if (!gift) {

        console.log("Regalo sin configurar:", giftName);

        return state;

    }

    // Ranking
    rankingService.addPoints(user, gift.points);

    state.ranking = rankingService.getRanking();

    // Progreso
    state.progress += gift.points;

    if (state.progress > config.goal) {

        state.progress = config.goal;

    }

    // Último regalo
    // Último regalo
state.lastUser = user;

state.lastGift = {

    name: giftName,

    points: gift.points,

    emoji: gift.emoji || "🎁",

    effect: gift.effect || null,

    sound: gift.sound || null

};

    // ¿Meta completada?
    if (state.progress === config.goal) {

        console.log("🎉 META COMPLETADA");

        setTimeout(() => {

            state.progress = 0;
            state.lastGift = null;
            state.lastUser = null;

            socketManager.broadcastGameState(state);

        }, 5000);

    }

    return state;

}

module.exports = {

    processGift

};