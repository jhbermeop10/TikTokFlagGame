const ranking = {};

function addPoints(user, points) {

    if (!ranking[user]) {
        ranking[user] = 0;
    }

    ranking[user] += points;

}

function getRanking() {

    return Object.entries(ranking)

        .sort((a, b) => b[1] - a[1])

        .slice(0, 10)

        .map(player => ({

            user: player[0],

            points: player[1]

        }));

}

function resetRanking() {

    Object.keys(ranking).forEach(user => {

        delete ranking[user];

    });

}

module.exports = {

    addPoints,

    getRanking,

    resetRanking

};