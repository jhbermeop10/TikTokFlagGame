const countries = require("../config/countries.json");

function getCountries() {
    return countries;
}

function getSortedCountries() {

    const sorted = [...countries].sort((a, b) => {

        // 1. Más victorias
        if (b.wins !== a.wins) {
            return b.wins - a.wins;
        }

        // 2. Más progreso
        if (b.progress !== a.progress) {
            return b.progress - a.progress;
        }

        // 3. Orden alfabético
        return a.country.localeCompare(b.country);

    });

    // Asignar posición oficial
    sorted.forEach((country, index) => {

        country.position = index + 1;

    });

    return sorted;

}

function getCountryByGift(giftName){

    const gift = giftName
        .trim()
        .toLowerCase();

    return countries.find(country =>

        country.gift.name
            .trim()
            .toLowerCase() === gift

    );

}

function processGift(giftName, goal) {

    console.log(`🎁 Regalo recibido: ${giftName}`);

    const country =
    getCountryByGift(giftName);

        if(!country){

            return null;

        }

    country.progress += country.gift.points;

    if (country.progress > goal) {

        country.progress = goal;

    }

    const completed = country.progress >= goal;

    if (completed) {

        country.wins++;

    }

    return {

        country,

        completed

    };

}

function resetCountry(country) {

    country.progress = 0;

}

module.exports = {

    getCountries,

    getSortedCountries,

    getCountryByGift,

    processGift,

    resetCountry

};