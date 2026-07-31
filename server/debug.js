const gameEngine = require("./services/gameEngine");
const socketManager = require("./socket");

const users = [

    "Jorge",
    "Carlos",
    "Laura",
    "Andrés",
    "Valentina"

];

const gifts = [

    "Rose",
    "Finger Heart",
    "GG",
    "Perfume"

];

function random(list){

    return list[
        Math.floor(Math.random()*list.length)
    ];

}

function start(){

    console.log("🧪 Debug Mode iniciado");

    setInterval(()=>{

        const state = gameEngine.processGift(

            random(users),

            random(gifts)

        );

        socketManager.broadcastGameState(state);

    },1500);

}

module.exports = {

    start

};