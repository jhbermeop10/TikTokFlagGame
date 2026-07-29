const notification = document.getElementById("giftNotification");

window.showGift = function(user, gift, points) {

    notification.innerHTML = `
        <div style="font-size:34px">🎁 ${user}</div>
        <div style="margin-top:8px">${gift}</div>
        <div style="margin-top:8px;color:#00ff88">
            +${points} puntos
        </div>
    `;

    notification.classList.remove("show");

    void notification.offsetWidth;

    notification.classList.add("show");

};