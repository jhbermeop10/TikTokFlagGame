window.updateRanking = function(players){

    const list = document.getElementById("rankingList");

    list.innerHTML = "";

    players.forEach((player,index)=>{

        list.innerHTML += `
            <li>

                ${index+1}. ${player.user}

                <strong>

                    ${player.points}

                </strong>

            </li>
        `;

    });

}