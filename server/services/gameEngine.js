const countryService = require("./countryService");
const state = require("../state");
const config = require("../config");

const rankingService = require("./rankingService");
const socketManager = require("../socket");

function processGift(user, giftName) {

    // Procesar el regalo y actualizar el país
    const result = countryService.processGift(
        giftName,
        config.goal
    );

    if (!result) {

        console.log("Regalo sin configurar:", giftName);

        return state;

    }

    // Actualizar ranking
    rankingService.addPoints(
        user,
        result.country.gift.points
    );

    state.ranking = rankingService.getRanking();

    // Actualizar listado de países
    state.countries = countryService.getSortedCountries();

    // Guardar último regalo recibido
    state.lastUser = user;

    state.lastGift = {

        name: result.country.gift.name,

        emoji: result.country.gift.emoji,

        points: result.country.gift.points

    };

    // Si un país llegó a la meta
    if (result.completed) {

        console.log(`🏆 ${result.country.country} ganó una ronda`);

        state.winner = {

            id: result.country.id,

            country: result.country.country,

            emoji: result.country.emoji,

            wins: result.country.wins

        };

        setTimeout(() => {

            countryService.resetCountry(result.country);

            state.countries = countryService.getSortedCountries();

            state.winner = null;

            socketManager.broadcastGameState(state);

        }, 5000);

    }

    return state;

}

module.exports = {

    processGift

};