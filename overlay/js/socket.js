const socket = io();

socket.on("progress", handleProgress);

function handleProgress(data) {

    if (data.countries) {

        if(document.getElementById("countriesGrid").children.length===0){

            renderCountries(data.countries);

        }else{

        updateCountries(data.countries);

        }

    }

    if (data.ranking) {

        updateRanking(data.ranking);

    }

    updateGift(data);

    updateWinner(data);

}

function updateGift(data){

    if(!data.lastGift) return;

    showGift(data);

}

function updateWinner(data){
    return;
}