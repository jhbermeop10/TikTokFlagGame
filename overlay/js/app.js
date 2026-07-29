const socket = io();

const progress = document.getElementById("progress");
const percentage = document.getElementById("percentage");
const mask = document.getElementById("mask");
const notification = document.getElementById("notification");

socket.on("progress", (data)=>{

    progress.style.width = data.percentage + "%";

    percentage.innerHTML = data.percentage + "%";

    mask.style.width = (100-data.percentage)+"%";

    if(data.user){

        notification.innerHTML =
        `🎁 <b>${data.user}</b> envió <b>${data.gift}</b>`;

    }

});