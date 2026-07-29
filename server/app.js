const gameState = {
    progress: 0,
    goal: 100,
    ranking: {}
};

const path = require("path");
const dotenv = require("dotenv");

const result = dotenv.config({
    path: path.resolve(__dirname, "../.env")
});

console.log(result);

const socketManager = require("./socket");

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);

const tiktok = require("./tiktok");

const io = new Server(server);
socketManager.initialize(io);

const PORT = process.env.PORT || 3000;

let progress = 0;

const giftManager = require("./giftManager");

const fakeUsers = [
    "Carlos",
    "Laura",
    "Andrés",
    "Valentina",
    "Jorge"
];

const fakeGifts = [
    "Rose",
    "Finger Heart",
    "Panda",
    "Lion"
];

// Servir la carpeta overlay
app.use(express.static("overlay"));

io.on("connection", (socket) => {
    console.log("✅ Overlay conectado");

    socket.emit("progress", {
        percentage: 0,
        country: "Colombia"
    });

    socket.on("disconnect", () => {
        console.log("❌ Overlay desconectado");
    });
});

server.listen(PORT, () => {
    console.log("");
    console.log("===============================");
    console.log(" TikTok Flag Game iniciado");
    console.log("===============================");
    console.log(`Servidor: http://localhost:${PORT}`);
});

tiktok.connect((event) => {

    const state = giftManager.addGift(
        event.user,
        event.gift
    );

    console.log(
        `${event.user} envió ${event.gift}`
    );

});