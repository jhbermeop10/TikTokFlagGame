const { WebcastPushConnection } = require("tiktok-live-connector");

let connection = null;

async function connect(onGift) {

    const username = process.env.TIKTOK_USERNAME;

    connection = new WebcastPushConnection(username);

    console.log("Usuario leído del .env:", username);

    if (!username) {
        throw new Error("No se encontró TIKTOK_USERNAME en el archivo .env");
    }

    connection = new WebcastPushConnection(username);

    try {

        const state = await connection.connect();

        console.log("=================================");
        console.log("Conectado correctamente");
        console.log(`Sala: ${state.roomId}`);
        console.log(`Usuario: @${username}`);
        console.log("=================================");

    } catch (error) {

        console.error("No fue posible conectar:", error);

        return;
    }

    connection.on("gift", data => {

        onGift({
            user: data.uniqueId,
            gift: data.giftName
        });

    });

}

module.exports = { connect };