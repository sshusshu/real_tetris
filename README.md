
# Tetris Game

### 바닐라 자바스크립트로 만든 테트리스

- 테트리스 게임
- 시간에 따른 속도 조절
- 점수에 따른 랭킹

_Keyword : Vanilla JS(ES6) / Express / Heroku_

<img src="https://img.shields.io/badge/-html5-E34F26?style=flat&logo=html5&logoColor=00c8ff"> <img src="https://img.shields.io/badge/-Sass-cc6699?style=flat&logo=sass&logoColor=ffffff"> <img src="https://img.shields.io/badge/-JavaScript-eed718?style=flat&logo=javascript&logoColor=ffffff">
<img src="https://img.shields.io/badge/-Express-blue?style=flat&logo=Express&logoColor=ffffff">

> 제로초 웹게임 강좌를 반복 학습 후 다시 제작
>
> 속도 조절 & 랭킹 추가 구현

 👉 👉 [ 바로가기](https://sshusshu.github.io/real_tetris/)

---

<img width="80%" src="https://user-images.githubusercontent.com/66768245/126979173-4a0121d3-48c3-4d31-848f-83defd8f3464.gif">

### LET'S GET IT! 자바스크립트 베타 학습단으로 활동

<img width="34%" src="https://user-images.githubusercontent.com/66768245/127068687-c2a30e1b-a1ee-47d0-92b3-0033e2389d27.png"> <img width="64%" src="https://user-images.githubusercontent.com/66768245/127096833-43a62756-29a5-40ba-8987-03eef035dca7.jpg">

## 🔳 코드 구성

### ✔️ Table 태그와 이차원 배열 데이터를 연결하여 이벤트에 따라 데이터를 조작하고 화면을 그려주는 방식

- 테트리스 판 :  
  Table 태그와 이차원 배열 데이터를 연결하여 구성

- 블럭 :  
  기본 블럭 모양과 회전했을 때의 모양을 각각 이차원 배열에 0과 1로 데이터로 저장하여 구성

- 랭킹 :
  이용자의 이름과 점수, 날짜를 저장하는 JSON DB를 간단히 구성하고 Express와 axios를 이용하여 통신
  Heroku로 서버를 배포

### ✔️ 주요 이벤트

1. 블럭 하강 : setInterval API로 주기적으로 블럭이 떨어지는 함수(goDown) 호출
2. 블럭 이동 : keyup 이벤트로 방향키 조작에 따라 좌우로 이동
3. 블럭 회전 : keyup 이벤트로 방향키 조작에 따라 블럭 회전
4. 블럭 한 번에 하강 : goDown 함수를 연속 호출
5. 랭킹 등록 : 게임오버 시 닉네임과 점수, 날짜 등을 JSON 데이터로 저장
6. 랭킹 출력 : 서버에서 받아온 데이터에서 점수 기준으로 3등까지만 정렬하여 화면에 나타냄
<img width="80%" src="https://user-images.githubusercontent.com/66768245/129699510-05f3adfc-434e-4e69-a964-fad2f4ff0743.gif">

### ✔️ 이벤트 조작 방법:

- 블럭

  - 주기적으로 변경될 위치를 nextXY = [X좌표, Y좌표]에 저장
    - 블럭 하강 : Y좌표에 +1
    - 블럭 좌로 이동 : X좌표에 -1
    - 블럭 우로 이동 : X좌표에 +1
    - 블럭 한 번에 하강 : goDown 함수의 return 값을 true로 설정하여 while 문으로 연속 호출
  - 변경될 모양을 블럭별로 배열에 저장
    - 블럭 회전 : nextShapeIdx +1 index 값으로 블럭 회전 모양 데이터를 선택

- 랭킹
  - 닉네임, 점수, 날짜를 JSON 형태로 저장
  - 점수 기준 3번째까지만 출력

---

## 🔳 주요 이슈 사항

1. 시간에 따라 블럭이 내려오는 속도가 빨라지는 코드 구현
   - 10초마다 tick함수의 기준 시간을 0.05초씩 감소시키는 tickControl 함수
   - setInterval 함수가 중첩 적용되어 시간 체계가 엉킴

- 문제 해결 방법
  - 시간이 감소할 때마다 clearInterval로 제거 후 새로운 tick함수를 생성시켜 중복되지 않게 함

```js
let tickTime = 1000;
let tick = setInterval(goDown, tickTime);
//점점 속도 빠르게
let tickControl = setInterval(() => {
  tickTime -= 50;
  clearInterval(tick);
  tick = setInterval(goDown, tickTime);
}, 10000);
```

2. 기본적인 테트리스 게임 -> 난이도별 게임이 필요해 보임

- 난이도 별 속도 변경 (개발 예정)
- 난이도 별 테트리스 판 크기 변경 가능

```JS
  const colLen = 20;
  const rowLen = 15;

```

블록 좌표 재설정 시, 바닥에 도달했을 때, rowLen, colLen 변수를 계산하여 사용

3. 클라이언트와 서버가 하나의 프로젝트에 있을 때 배포하는 법 고민

- 깔끔하게 따로 관리하고 싶어, 별도의 서버 레포지토리를 만들어 서버를 배포(heroku 이용)
- 클라이언트 측은 따로 배포 (gh-pages 이용)

```

 REAL_TETRIS
  |
  |--asset
  |--index
  |--server

```

---

## 🔳 프로젝트를 통해 배운점

> - ES6의 이해와 적용
> - 호출 스택과 이벤트 루프의 이해
> - JSON Database 구성
> - Heroku 배포

---

## 🔳 호출 스택과 이벤트 루프

1. setInterval tick 함수 선언 시 호출 스택에서
2. tick 함수 인수로 입력한 콜백 함수(goDown)와 시간(2000ms)을 백그라운드에 전달
3. 시간(2000ms)을 주기로 콜백 함수(goDown)를 태스크 큐에 전달
4. 태스크 큐에서 호출 스택이 비워질 때마다 호출스택에 콜백 함수(goDown)를 전달 실행

_keyup 이벤트도 마찬가지로 실행_
_방향 키를 누를 때마다 이벤트가 발생하고 넘겨지는 콜백 함수가 실행_

<img width="50%" src="https://user-images.githubusercontent.com/66768245/126979524-4c66e930-0393-4f18-8b32-c336a53dc45e.png">
이미지 출처 How JavaScript works: an overview of the engine, the runtime, and the call stack

---
