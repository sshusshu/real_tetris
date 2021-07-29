const lankBox = document.querySelector('.lanking ul');

const renderRank = async()=>{
    let uri = 'https://tetris-server-app-2.herokuapp.com/rank';

    const response = await fetch(uri);
    const ranks = await response.json();

    const rankInfo = ranks.sort((a,b)=>{
        return b.score - a.score 
    }).slice(0,3)

    let template = '';
    rankInfo.forEach((rank,i) => {
        template += `
        <li>
            <i><img src="img/${i+1}.svg"/></i>
            <div>
                <span class="date">${rank.timestamp}</span>
                <span class="nick">${rank.id}</span>
                <span class="score-line">score : <em class="score">${rank.score}</em></span>
            </div>
        </li>
        `
    });

    lankBox.innerHTML = template;

}



window.addEventListener('DOMContentLoaded',() => renderRank())