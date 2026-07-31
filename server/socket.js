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

    io.emit("progress", state);

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

        broadcastGameState(state);

        console.log("Configuración actualizada");

    });

}

module.exports = {
    initialize,
    broadcastGameState
};