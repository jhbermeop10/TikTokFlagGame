const countries = require("../config/countries.json");

function getCountries() {
    return countries;
}

function getSortedCountries() {

    return [...countries].sort((a, b) => {

        if (b.progress !== a.progress) {
            return b.progress - a.progress;
        }

        return b.wins - a.wins;

    });

}

function getCountryByGift(giftName) {

    return countries.find(country =>
        country.gift.name === giftName
    );

}

function processGift(giftName, goal) {

    const country = getCountryByGift(giftName);

    if (!country) {

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