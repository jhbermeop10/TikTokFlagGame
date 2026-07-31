const socket = io();

fetch("/game-config")
.then(r => r.json())
.then(config => {

    document.getElementById("country").value =
        config.country;

    document.getElementById("goal").value =
        config.goal;

});

document
.getElementById("save")
.onclick = ()=>{

    socket.emit("saveConfig",{

        country:
            document.getElementById("country").value,

        goal:
            Number(
                document.getElementById("goal").value
            )

    });

};