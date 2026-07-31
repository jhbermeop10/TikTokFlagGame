const configService = require("./services/configService");
const state = require("./state");

let io;

function initialize(socketServer) {
    io = socketServer;
    io.on("connection", (socket) => {

    console.log("✅ Cliente conectado");

    registerEvents(socket);
    broadcastGameState(state);

    socket.on("disconnect", () => {

        console.log("❌ Cliente desconectado");

        });

    });
}

function broadcastGameState(state) {

    if (!io) return;

    io.emit("progress", {

    percentage: state.progress,

    user: state.lastUser,

    gift: state.lastGift,

    ranking: state.ranking,

    title: state.title,

    country: state.country,

    goal: state.goal,

    flag: state.flag

    });

}

function registerEvents(socket){

    socket.on("saveConfig",(config)=>{

        const current =
            configService.getConfig();

        const updated = {

            ...current,

            country: config.country,

            goal: config.goal

        };

        configService.saveConfig(updated);

        state.country = updated.country;
        state.goal = updated.goal;

        broadcastGameState(state);

        console.log("Configuración actualizada");

    });

}

module.exports = {
    initialize,
    broadcastGameState
};