const countryElements = {};

const previousPositions = {};

window.renderCountries = function (countries) {

    const grid = document.getElementById("countriesGrid");

    if (!grid) return;

    // Solo construir una vez
    if (grid.children.length === 0) {

    countries
        .forEach((country) => {

            const card = createCountryCard(
                country,
                country.position
            );

            grid.appendChild(card);

        });

    } else {

        updateCountries(countries);

    }
}

window.updateCountries = function (countries) {

    const grid = document.getElementById("countriesGrid");

    countries.forEach((country) => {

        const ui = countryElements[country.id];

        if (!ui) return;

        const oldPosition = previousPositions[country.id];

        previousPositions[country.id] = country.position;

        ui.progress.style.width = country.progress + "%";

        ui.percent.textContent = country.progress + "%";

        ui.wins.textContent = "🏆 " + country.wins;

        ui.move.textContent = "";

        if (oldPosition !== undefined) {

            if (country.position < oldPosition) {

                ui.move.textContent = "⬆️";

            }else if (country.position > oldPosition) {

                ui.move.textContent = "⬇️";

            }

    }

    ui.card.classList.remove("countryLeader");

    if (country.position === 1) {

    ui.card.classList.add("countryLeader");
    ui.position.innerHTML = "👑";

    } else {

    ui.card.classList.remove("countryLeader");
    ui.position.innerHTML = "#" + country.position;

    }

    grid.appendChild(ui.card);

    });

}

function createCountryCard(country, position) {

    const card = document.createElement("div");

    card.className = "countryCard";

    card.dataset.country = country.id;

    card.innerHTML = `

<div class="countryTop">

    <div class="countryLeft">

        <span class="countryPosition">
            ${position===1 ? "👑" : "#" + position}
        </span>

        <img
    class="countryIcon"
    src="assets/icons/${country.icon}"
    alt="${country.country}">

        <span class="countryName">
            ${country.country}
        </span>

    </div>

    <div class="countryRight">

        <span class="moveIcon"></span>

        <span class="countryWins wins">
            🏆 ${country.wins}
        </span>

    </div>

</div>

<div class="countryProgressRow">

    <img
    class="giftIcon"
    src="assets/gifts/${country.gift.image}"
    alt="${country.gift.name}">

    <div class="countryProgress">

        <div class="countryFill"></div>

    </div>

    <span class="percent">
        ${country.progress}%
    </span>

</div>

`;



    countryElements[country.id] = {

    card,

    progress: card.querySelector(".countryFill"),

    percent: card.querySelector(".percent"),

    wins: card.querySelector(".wins"),

    position: card.querySelector(".countryPosition"),

    move: card.querySelector(".moveIcon")

};

    countryElements[country.id].progress.style.width =
        country.progress + "%";


const ui = countryElements[country.id];

ui.progress.style.background = `
linear-gradient(
90deg,
${country.colors.primary},
${country.colors.secondary},
${country.colors.accent}
)`;

    return card;

}