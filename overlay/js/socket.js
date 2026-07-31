const socket = io();

socket.on("progress",(data)=>{

    updateProgress(data.percentage);
    if(data.percentage >= 100){

    showGoalCompleted();

    }
    updateGameInfo(data);

    if(data.user){

        showGift(

            data.user,

            data.gift

        );

    }

    updateRanking(

        data.ranking

    );

});