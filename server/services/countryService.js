const countries = require("../config/countries.json");

function getCountries() {
    return countries;
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

    if (country.progress === goal) {

        country.wins++;

        return {

            country,

            completed: true

        };

    }

    return {

        country,

        completed: false

    };

}

function resetCountry(id){

    const country = countries.find(c=>c.id===id);

    if(country){

        country.progress=0;

    }

}

module.exports={

    getCountries,

    getCountryByGift,

    processGift,

    resetCountry

};