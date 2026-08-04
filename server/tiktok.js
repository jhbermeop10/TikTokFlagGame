const { TikTokLiveConnection } = require("tiktok-live-connector");

let connection = null;

async function connect(onGift) {

    const username = process.env.TIKTOK_USERNAME;

    if (!username) {
        throw new Error("No se encontró TIKTOK_USERNAME en el archivo .env");
    }

    console.log("Usuario leído del .env:", username);

    connection = new TikTokLiveConnection(
    username,
    {
        processInitialData: true
    }
);

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

     /* connection.on("gift", data => {

        onGift({
            user: data.uniqueId,
            gift: data.giftName
        });

    });  */

    connection.on("gift", data => {

    const user =
        data.user?.nickname ||
        data.uniqueId ||
        "Usuario";

    const gift =
        data.gift?.name ||
        data.giftName ||
        "";

    console.log("Usuario:", user);
    console.log("Regalo:", gift);

    onGift({
        user,
        gift
    });

});

//     connection.on("gift", data => {

//     console.log("========== REGALO ==========");
//     console.dir(data, { depth: null });

//     onGift({
//         user: data.uniqueId,
//         gift: data.giftName
//     });

// });

}

module.exports = { connect };