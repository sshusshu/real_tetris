const lankBox = document.querySelector('.lanking ul');

const renderRank = async()=> {
    const getRank = async () => {
        try {
            const res = await fetch('https://sshus-tetris.herokuapp.com/rank');
            return res.json();
        } catch (error) {
            console.log(error)
        }
    }

    const rankObj = await getRank();
    const rankInfo = rankObj.rank.sort((a,b)=>{
    return b.score - a.score
    }).slice(0,3)

    let template = '';
    rankInfo.forEach((rank,i) => {
        template += `
        <li>
            <i><img src="asset/img/${i+1}.svg"/></i>
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










