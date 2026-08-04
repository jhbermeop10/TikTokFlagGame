const gameEngine = require("./services/gameEngine");
const socketManager = require("./socket");

const users = [

    "Jorge",
    "Jorge",
    "Jorge",

    "Maria",
    "Maria",

    "Humberto",
    "Humberto",

    "Nedrey",

    "Ana"

];

const gifts = [

    "Rose",
    "Rose",
    "Rose",
    "Rose",

    "White Rose",
    "White Rose",
    "White Rose",

    "TikTok",
    "TikTok",

    "Te Adoro",

    "Ice Cream Cone",

    "Wink"

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

    },1000);

}

module.exports = {

    start

};