const countryElements = {};

window.renderCountries = function (countries) {

    const grid = document.getElementById("countriesGrid");

    if (!grid) return;

    // Solo construir una vez
    if (grid.children.length === 0) {

    countries
        .sort((a, b) => {

            if (b.progress !== a.progress) {
                return b.progress - a.progress;
            }

            return b.wins - a.wins;

        })
        .forEach((country, index) => {

            const card = createCountryCard(
                country,
                index + 1
            );

            grid.appendChild(card);

        });

    } else {

        updateCountries(countries);

    }

    countries
    .sort((a, b) => {

        if (b.progress !== a.progress) {
            return b.progress - a.progress;
        }

        return b.wins - a.wins;

    })
    .forEach((country, index) => {

        const card = createCountryCard(
            country,
            index + 1
        );

        grid.appendChild(card);

    });

}

window.updateCountries = function (countries) {

    const grid = document.getElementById("countriesGrid");

    countries.sort((a, b) => {

        if (b.progress !== a.progress) {
            return b.progress - a.progress;
        }

        return b.wins - a.wins;

    });

    countries.forEach((country, index) => {

        const ui = countryElements[country.id];

        if (!ui) return;

        ui.progress.style.width = country.progress + "%";

        ui.percent.textContent = country.progress + "%";

        ui.wins.textContent = "🏆 " + country.wins;

        ui.position.textContent = "#" + (index + 1);

        // Destacar al líder
        ui.card.classList.remove("countryLeader");

        if (index === 0) {
            ui.card.classList.add("countryLeader");
        }

        // Mover la tarjeta al nuevo orden
        grid.appendChild(ui.card);

    });

}

function createCountryCard(country, position) {

    const card = document.createElement("div");

    card.className = "countryCard";

    card.innerHTML = `

    <div class="countryPosition">
        #${position}
    </div>

    <div class="countryTop">

        <div class="countryInfo">

            <span class="countryEmoji">
                ${country.emoji}
            </span>

            <span class="countryName">
                ${country.country}
            </span>

        </div>

        <div class="countryWins wins">
            🏆 ${country.wins}
        </div>

    </div>

    <img
        class="countryFlag"
        src="assets/flags/${country.flag}"
        alt="${country.country}">

    <div class="countryProgress">

        <div class="countryFill"></div>

    </div>

    <div class="countryFooter">

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

    position: card.querySelector(".countryPosition")

};

    countryElements[country.id].progress.style.width =
        country.progress + "%";

    countryElements[country.id].card = card;

    return card;

}