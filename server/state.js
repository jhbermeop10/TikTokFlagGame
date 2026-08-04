const countryService = require("./services/countryService");

module.exports = {

    countries: countryService.getCountries(),

    ranking: [],

    lastGift: null,

    lastUser: null,

    winner: null,

    champion: null,

    gameStatus: "playing"

};