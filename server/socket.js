let io;

function initialize(socketServer) {
    io = socketServer;
}

function broadcastGameState(state) {

    if (!io) return;

    io.emit("progress", {

        percentage: state.progress,

        user: state.lastUser,

        gift: state.lastGift,

        points: state.lastPoints || 0

    });

}

module.exports = {
    initialize,
    broadcastGameState
};