window.updateRanking = function(players){

    const list = document.getElementById("rankingList");

    list.innerHTML = "";

    const medals = ["🥇","🥈","🥉"];

    players
        .slice(0,3)
        .forEach((player,index)=>{

            list.innerHTML += `
                <li class="rankingItem">

                    <span class="rankingMedal">
                        ${medals[index]}
                    </span>

                    <span class="rankingName">
                        ${player.user}
                    </span>

                </li>
            `;

        });

}