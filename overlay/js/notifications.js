window.showGift = function(user, gift){

    if(!gift){
        return;
    }

    const container = document.getElementById("effectsContainer");

    const card = document.createElement("div");

    card.className = "giftCard";

    card.innerHTML = `
        <div class="giftEmoji">${gift.emoji}</div>
        <div class="giftUser">${user}</div>
        <div class="giftName">${gift.name}</div>
        <div class="giftPoints">+${gift.points}</div>
    `;

    container.appendChild(card);

    setTimeout(() => {

        card.remove();

    }, 3000);

}