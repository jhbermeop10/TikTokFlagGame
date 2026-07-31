window.updateProgress = function (percentage) {

    percentage = Math.max(0, Math.min(100, percentage));

    document.getElementById("progressFill").style.width =
        percentage + "%";

    document.getElementById("progressText").textContent =
        percentage + "%";

    document.getElementById("flagMask").style.width =
        (100 - percentage) + "%";

}

window.updateGameInfo = function(data){

    document.getElementById("gameTitle").textContent =
        data.title;

    document.getElementById("countryName").textContent =
        data.country;

    document.getElementById("goalValue").textContent =
        data.goal + "%";

    document.getElementById("flag").src =
        "assets/flags/" + data.flag;

}

window.showGoalCompleted = function () {

    const panel = document.getElementById("gamePanel");

    panel.classList.add("goalCompleted");

    setTimeout(() => {

        panel.classList.remove("goalCompleted");

    }, 4000);

}