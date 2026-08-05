let currentGiftCard = null;

window.showGift = function(data){

    const user = data.lastUser;
    const gift = data.lastGift;

    if(!gift){
        return;
    }

    const container = document.getElementById("effectsContainer");

 // Eliminar cualquier tarjeta anterior
    container.querySelectorAll(".giftCard").forEach(card => card.remove());

    // Eliminar cualquier regalo volando anterior
    container.querySelectorAll(".flyingGift").forEach(gift => gift.remove());

    const card = document.createElement("div");

// Guardar referencia de la tarjeta actual
    currentGiftCard = card;

    card.className = "giftCard";

    const target = document.querySelector(
    `[data-country="${gift.countryId}"]`
    );

    if(target){

        const rect = target.getBoundingClientRect();

        console.log(gift.countryId);

        console.log(rect);

    }

    card.innerHTML = `
        <div class="giftImage">

            <img
                src="assets/gifts/${gift.image}"
                alt="${gift.name}">

        </div>

        <div class="giftUser">${user}</div>

        <div class="giftName">${gift.name}</div>

        <div class="giftPoints">+${gift.points}</div>
    `;

    container.appendChild(card);

    if(target){

        setTimeout(()=>{

            flyGift(card, target, gift);

        },500);

    }

}

function flyGift(card, target, gift){

    // Imagen original dentro de la tarjeta
    const original = card.querySelector(".giftImage img");

    if(!original){
        console.error("No se encontró la imagen del regalo.");
        return;
    }

    // Crear un clon para la animación
    const flying = original.cloneNode(true);

    flying.className = "flyingGift";

    document.body.appendChild(flying);

    // Posición inicial
    const start = original.getBoundingClientRect();

    // Posición final (icono del regalo del país)
    const targetIcon = target.querySelector(".giftIcon");

    if(!targetIcon){
        console.error("No se encontró el icono del país.");
        flying.remove();
        return;
    }

    const end = targetIcon.getBoundingClientRect();

    // Colocar el clon exactamente encima de la imagen original
    flying.style.left = start.left + "px";
    flying.style.top = start.top + "px";

    // Ocultar la imagen original
    original.style.visibility = "hidden";

    // Esperar un frame antes de iniciar la transición
    requestAnimationFrame(() => {

        flying.style.left = end.left + "px";
        flying.style.top = end.top + "px";

        flying.style.transform = "scale(.55) rotate(360deg)";

    });

    flying.addEventListener("transitionend", () => {

        flying.remove();

        card.remove();

        if(currentGiftCard === card){

            currentGiftCard = null;

        }

    });

}