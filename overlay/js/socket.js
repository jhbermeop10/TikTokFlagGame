const socket = io();

socket.on("progress", (data) => {

    updateProgress(data.percentage);

    if (data.user) {

        showGift(
            data.user,
            data.gift,
            data.points
        );

        updateRanking(
            data.user,
            data.points
        );

    }

});