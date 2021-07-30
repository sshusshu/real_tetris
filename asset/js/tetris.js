let tetris = document.querySelector('#tetris');
let tetrisData = [];
const dataModal = document.querySelector('.data-modal');
const InputId = dataModal.querySelector('form');
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'violet'];
const colLen = 20;
const rowLen = 15;
let nowBlock;
let nextBlock;
let nowXY = [0, Math.floor(rowLen/2-1)];

let nickNameData;
let scoreData;

const getId = async(e)=>{
  e.preventDefault();
  nickNameData = e.target.children[0].value;
  const time = new Date();
  const lankData = {
    id:nickNameData,
    score:scoreData,
    timestamp:`${time.getFullYear()}.${time.getMonth()+1}.${time.getDate()}`
  }

  await fetch('https://sshus-tetris.herokuapp.com/rank',{
    method:'POST',
    body: JSON.stringify(lankData),
    headers:{'Content-Type':'application/json'}
  })
}

InputId.addEventListener('submit',async(e)=>{
  await getId(e)
  dataModal.style.display="none";
  window.location.reload()
})


let blocks = [
  {
    name: 's', // 네모
    center: false,
    numCode: 1,
    color: 'red',
    shapeIdx: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [0, 1, 1],
      ]
    ],
  },
  {
    name: 't', // T자
    center: true,
    numCode: 2,
    color: 'orange',
    shapeIdx: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ]
  },
  {
    name: 'z', // 지그재그
    center: true,
    numCode: 3,
    color: 'yellow',
    shapeIdx: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ]
  },
  {
    name: 'zr', // 반대 지그재그
    center: true,
    numCode: 4,
    color: 'green',
    startRow: 1,
    shapeIdx: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
    ]
  },
  {
    name: 'l', // L자
    center: true,
    numCode: 5,
    color: 'blue',
    shapeIdx: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
    ]
  },
  {
    name: 'lr', // 반대 L자
    center: true,
    numCode: 6,
    color: 'navy',
    shapeIdx: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
    ]
  },
  {
    name: 'b', // 1자
    center: true,
    numCode: 7,
    color: 'violet',
    shapeIdx: 0,
    shape: [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
    ]
  },
];

function init(){
  //테트리스 테이블 생성 & 데이터 생성
  const fragment = document.createDocumentFragment();
  for(let i = 0; i<colLen ;i++){
    const tr = document.createElement('tr');
    const trData = [];
    fragment.appendChild(tr);
    for(let j = 0; j<rowLen; j++){
      const td = document.createElement('td');
      tr.appendChild(td);
      trData.push(0);
    }
    tetrisData.push(trData)
  }
  tetris.appendChild(fragment);
}

function draw(){
   tetrisData.forEach((tr,i)=>{
     tr.forEach((td,j)=>{
       const tdName =tetris.children[i].children[j];
       if(td) tdName.className = tetrisData[i][j] < 0? colors[tetrisData[i][j] * -1-1]:colors[tetrisData[i][j]-1];
       else tdName.className = '';
     })
   })
}

function drawNext(){
  const next = document.getElementById('next-table');
  next.querySelectorAll('td').forEach(td=> td.className='')

  nextBlock.shape[0].forEach((tr,i) => {
    tr.forEach((td,j)=>{
       const tdName = next.children[0].children[i].children[j];
        if(td) tdName.className = nextBlock.color;
    })
  });
}

function generate(){
  //블록 생성
  nowBlock = nowBlock? nextBlock
  : blocks[Math.floor(Math.random()*blocks.length)];
  nextBlock = blocks[Math.floor(Math.random()*blocks.length)];
  drawNext();

  nowBlock.shapeIdx = 0;
  nowXY = [-1,Math.floor(rowLen/2-1)]; // 블록 XY 재설정

  let isGameOver = false;
  nowBlock.shape[0].slice(1).forEach((col,i)=>{
    col.forEach((row,j)=>{
      if(row&&tetrisData[i][j+Math.floor(rowLen/2-1)]){
        isGameOver = true;
      }
    })
  })

  //블록 데이터 일치시키기
  nowBlock.shape[0].slice(1).forEach((col,i)=>{
    col.forEach((row,j)=>{
      if(row) tetrisData[i][j+Math.floor(rowLen/2-1)] = nowBlock.numCode;
    })
  })

  if(isGameOver){
    clearInterval(tickControl);
    clearInterval(tick);
    alert('game over!');
    dataModal.style.display="flex";
    scoreData = parseInt(document.getElementById('score').textContent, 10);
  }
}

function checkRow(){

  const fullRows= [];
  tetrisData.forEach((col,i)=>{
    let count = 0;
    col.forEach((row,j)=>{
      if(row<0) count++
    })
    if(count===rowLen){
      fullRows.push(i)
    }
  })

  for(let i = 0; i<fullRows.length;i++){
    tetrisData.splice(fullRows[i],1);
    tetrisData.unshift(Array(rowLen).fill(0))
  }

  let score = parseInt(document.getElementById('score').textContent, 10);
  score += fullRows.length * 10;
  document.getElementById('score').textContent = String(score);
}

const isActive = value =>{
  if(value>0) return true;
  return false;
}
const isStopped = value =>{
  if(value===undefined||value<0) return true;
  return false;
}

function goDown(){
  const nextXY = [nowXY[0]+1,nowXY[1]];
  const nowBlockShape = nowBlock.shape[nowBlock.shapeIdx];
  let activeBlocks = [];
  let canGoDown = true;
  for(let i = nowXY[0]; i<nowXY[0]+nowBlockShape.length; i++){
    if(i<0||i>=colLen) continue;
    for(let j = nowXY[1]; j<nowXY[1]+nowBlockShape.length; j++){
      if(isActive(tetrisData[i][j])){
        activeBlocks.push([i,j])
        if(isStopped(tetrisData[i+1]&&tetrisData[i+1][j])){
          canGoDown = false;
        }
      }
    }
  }

  if(!canGoDown){
    activeBlocks.forEach(b=>{
      tetrisData[b[0]][b[1]] *= -1
    })
    checkRow();
    generate();
    return false;
  }else{
    for(let i = colLen-1;i>=0;i--){
      tetrisData[i].forEach((row,j)=>{
        if(row>=0&&tetrisData[i+1]&&tetrisData[i+1][j]>=0){
          tetrisData[i+1][j]=row;
          tetrisData[i][j]=0;
        }
      })
    }
    nowXY = nextXY;
    draw();
    return true;
  }
}


init();
generate();


// 이벤트

let tickTime = 1000;
let tick = setInterval(goDown,tickTime)
let tickControl = setInterval(()=>{
  tickTime -= 50;
  clearInterval(tick)
  tick = setInterval(goDown,tickTime)
},10000)
let isPaused = false;


const addClassOn = target => {
    target.classList.add('on')
}

const removeClassOn = target =>{
    target.classList.remove('on')
}

const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop')

stopBtn.addEventListener('click',function(){
  removeClassOn(startBtn)
  addClassOn(this)
  isPaused=true;
  clearInterval(tick)
  clearInterval(tickControl)
})

startBtn.addEventListener('click',function(){
    removeClassOn(stopBtn)
    addClassOn(this)
    if(isPaused){
        tick = setInterval(goDown,tickTime)
        tickControl = setInterval(()=>{
          tickTime -= 50;
          clearInterval(tick);
          tick = setInterval(goDown,tickTime)
        },5000)
    }
    isPaused=false;
})

window.addEventListener('keydown',(e)=>{
  switch(e.code){
    case 'ArrowLeft':{ // 좌측이동
      const nextXY = [nowXY[0],nowXY[1]-1];
      const nowBlockShape = nowBlock.shape[nowBlock.shapeIdx];
      let canGoLeft = true;
      for(let i = nowXY[0]; i<nowXY[0]+nowBlockShape.length; i++){
        if(!canGoLeft) break;
        for(let j = nowXY[1]; j<nowXY[1]+nowBlockShape.length; j++){
          if(!tetrisData[i]||!tetrisData[i][j]) continue;
          if(isActive(tetrisData[i][j])&&isStopped(tetrisData[i]&&tetrisData[i][j-1])){
              canGoLeft = false;
            }
          }
        }

      if(canGoLeft){
        nowXY = nextXY;
        tetrisData.forEach((col,i)=>{
          col.forEach((row,j)=>{
            if(tetrisData[i][j-1]===0&&row>=0){
              tetrisData[i][j-1]=row;
              tetrisData[i][j]=0
            }
          })
        })
        draw();
      }
      break;
    }
    case 'ArrowRight':{// 우측이동
      const nextXY = [nowXY[0],nowXY[1]+1];
      const nowBlockShape = nowBlock.shape[nowBlock.shapeIdx];
      let canGoRight = true;
      for(let i = nowXY[0]; i<nowXY[0]+nowBlockShape.length; i++){
        if(!canGoRight) break;
        for(let j = nowXY[1]; j<nowXY[1]+nowBlockShape.length; j++){
          if(!tetrisData[i]||!tetrisData[i][j]) continue;
          if(isActive(tetrisData[i][j])&&isStopped(tetrisData[i]&&tetrisData[i][j+1])){
            canGoRight = false;
            }
          }
        }

      if(canGoRight){
        nowXY = nextXY;
        tetrisData.forEach((col,i)=>{
          for (var j = col.length - 1; j >= 0; j--) {
            const row = col[j];
            if (tetrisData[i][j + 1] === 0 && row > 0) {
              tetrisData[i][j + 1] = row;
              tetrisData[i][j] = 0;
            }
          }
        })
        draw();
      }
      break;
    }
    case 'ArrowDown':{
      goDown();
    }
  }
})

window.addEventListener('keyup',(e)=>{
  switch (e.code){
    case 'ArrowUp' :{
      const nowBlockShape = nowBlock.shape[nowBlock.shapeIdx];
      const nextShapeIdx = nowBlock.shapeIdx+1===nowBlock.shape.length?0:nowBlock.shapeIdx+1;
      const nextBlockShape = nowBlock.shape[nextShapeIdx];
      let canCirculate = true;
      for(let i = nowXY[0]; i<nowXY[0]+nowBlockShape.length; i++){
        if(!canCirculate) break;
        for(let j = nowXY[1]; j<nowXY[1]+nowBlockShape.length; j++){
          if(!tetrisData[i]) continue;
          if(nextBlockShape[i-nowXY[0]][j-nowXY[1]]>0&&isStopped(tetrisData[i]&&tetrisData[i][j])){
            canCirculate = false;
            }
          }
        }

      if(canCirculate){
        while(nowXY[0]<0){
          goDown();
        }
        for(let i = nowXY[0];i<nowXY[0]+nowBlockShape.length;i++){
          for(let j = nowXY[1];j<nowXY[1]+nowBlockShape.length;j++){
            if(!tetrisData[i]) continue;
            let nextBlockShapeCell = nextBlockShape[i-nowXY[0]][j-nowXY[1]];
            if(nextBlockShapeCell!==0 && tetrisData[i][j]===0){
              tetrisData[i][j]=nowBlock.numCode;
            }else if (nextBlockShapeCell === 0&&tetrisData[i][j]&&tetrisData[i][j]>0){
              tetrisData[i][j] = 0;
            }
          }
        }
        nowBlock.shapeIdx = nextShapeIdx;
      }
        draw();
        break;
    }
    case 'Space' :{
      while(goDown()){}
      break;
    }
  }
})

