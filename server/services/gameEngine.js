const countryService = require("./countryService");

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
    const result = countryService.addProgress(
    giftName,
    gift.points,
    config.goal
    );

    state.countries =
    countryService.getSortedCountries();

    if (!result) {
        return state;
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
    if (result.completed) {

    console.log(`🏆 ${result.country.country} ganó`);

    countryService.addWin(result.country);

    state.countries =
    countryService.getSortedCountries();

    state.winner = {

    id: result.country.id,

    country: result.country.country,

    emoji: result.country.emoji,

    wins: result.country.wins + 1

    };

    setTimeout(() => {

        countryService.resetCountry(result.country);

        state.winner = null;

        socketManager.broadcastGameState(state);

        },5000);

    }

    return state;

}

module.exports = {

    processGift

};