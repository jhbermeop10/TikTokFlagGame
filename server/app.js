const configService = require("./services/configService");

const gameConfig = require("./gameConfig");

gameConfig.loadGameConfig();

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
app.use("/admin", express.static("overlay/admin"));

app.get("/game-config", (req, res) => {

    res.json(
        configService.getConfig()
    );

});

server.listen(PORT, () => {
    console.log("");
    console.log("===============================");
    console.log(" TikTok Flag Game iniciado");
    console.log("===============================");
    console.log(`Servidor: http://localhost:${PORT}`);
});

setInterval(() => {

    giftManager.addGift(
        "JORGE",
        "Rose"
    );

}, 3000);

/*

tiktok.connect((event) => {

    const state = giftManager.addGift(
        event.user,
        event.gift
    );

    console.log(
        `${event.user} envió ${event.gift}`
    );

});*/