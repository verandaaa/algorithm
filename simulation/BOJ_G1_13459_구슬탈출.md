https://www.acmicpc.net/problem/13459

# Solution 1 - JavaScript
~~~javascript
const { info } = require("console");
let fs = require("fs");
let input = fs.readFileSync("input.txt").toString().split("\n");
// let input = fs.readFileSync("/dev/stdin").toString().split('\n');
let [n, m] = input[0].split(" ");
let map = input.slice(1, input.length).map((v) => v.split(""));

//<------------input
let answer = 0;

class Pos {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class State {
  constructor(red, blue, count) {
    this.red = red;
    this.blue = blue;
    this.count = count;
  }
}

let red, blue;
for (let i = 0; i < n; i++) {
  //map에는 . 과 # 그리고 O만 남긴다
  for (let j = 0; j < m; j++) {
    if (map[i][j] === "R") {
      red = new Pos(i, j);
      map[i][j] = ".";
    }
    if (map[i][j] === "B") {
      blue = new Pos(i, j);
      map[i][j] = ".";
    }
  }
}

//첫 위치 저장
let visited = Array.from(Array(10000), () => false);
visited[calculate(red.x, red.y, blue.x, blue.y)] = true;
let queue = [new State(red, blue, 0)];
let dx = [-1, 1, 0, 0]; //상 하 좌 우
let dy = [0, 0, -1, 1];

loop: while (queue.length) {
  let q = queue.shift();
  if (q.count === 10) { //10회 제한
    continue;
  }

  for (let d = 0; d < 4; d++) {
    let first = whatIsFirst(d, q); //d 방향으로 구를건데, 무슨 구슬 먼저 이동할래?

    let redFlag;
    let blueFlag;
    let redStop;
    let blueStop;

    if (first === "red") {
      //빨간 구슬 멈추는 지점
      redStop = move(q.red, d);
      //구멍에 들어갔는가?
      redFlag = checkHole(redStop);
      //먼저 도착한 구슬 자리 차지
      checkRoom(redStop);
      //파란 구슬 멈추는 지점
      blueStop = move(q.blue, d);
      //구멍 검사
      blueFlag = checkHole(blueStop);
      //자리 풀기
      checkRoom(redStop);
    } else {
      //파란 구슬 멈추는 지점
      blueStop = move(q.blue, d);
      //구멍에 들어갔는가?
      blueFlag = checkHole(blueStop);
      //먼저 도착한 구슬 자리 차지
      checkRoom(blueStop);
      //빨간 구슬 멈추는 지점
      redStop = move(q.red, d);
      //구멍 검사
      redFlag = checkHole(redStop);
      //자리 풀기
      checkRoom(blueStop);
    }
    //구슬의 골인 여부
    if (blueFlag) continue;
    if (redFlag) {
      answer = 1;
      break loop;
    }

    //근데 r,b 위치가 이미 똑같이 예전에 갔었던 위치라면 무시
    let pos = calculate(redStop.x, redStop.y, blueStop.x, blueStop.y);
    if (visited[pos]) {
      continue;
    }

    visited[pos] = true;
    queue.push(new State(redStop, blueStop, q.count + 1));
  }
}
function move(marble, d) {
  let stop = new Pos(marble.x, marble.y); //구슬이 멈추는 지점
  for (let k = 0; ; k++) {
    let nx = marble.x + dx[d] * k;
    let ny = marble.y + dy[d] * k;

    if (map[nx][ny] === ".") {
      //길이 있으면 이동할 수 있다
      stop = new Pos(nx, ny); //멈추는 지점 갱신
    } else if (map[nx][ny] === "O") {
      //구멍이 있으면 들어간다
      stop = new Pos(nx, ny); //멈추는 지점 갱신
      break; //더 이상 이동하지 않음
    } else {
      //벽이다
      break; //더 이상 이동하지 않음
    }
  }
  return stop;
}

function checkHole(stop) {
  if (map[stop.x][stop.y] === "O") return true; //구멍에 들어갔다
  return false; //들어가지 않았다.
}

function checkRoom(stop) {
  if (map[stop.x][stop.y] === ".") {
    //길에서 멈췄으면 여기는 먼저 온 구슬의 차지이다
    map[stop.x][stop.y] = "#";
  } else if (map[stop.x][stop.y] === "#") {
    //다음 구슬도 이동을 마쳤으므로 원상복귀해준다
    map[stop.x][stop.y] = ".";
  }
}

function whatIsFirst(d, q) {
  //빨간구슬, 파란 구슬 중 누가 먼저 이동하는가?
  let first = "red";
  if (d == 0) {
    //위로 갈건데
    if (q.red.x > q.blue.x) first = "blue"; //더 위에있는 구슬 먼저
  } else if (d == 1) {
    //아래로 갈건데
    if (q.red.x < q.blue.x) first = "blue"; //더 아래 있는 구슬 먼저
  } else if (d == 2) {
    //왼쪽으로 갈건데
    if (q.red.y > q.blue.y) first = "blue"; //더 왼쪽에 있는 구슬 먼저
  } else {
    //오른쪽으로 갈건데
    if (q.red.y < q.blue.y) first = "blue"; //더 오른쪽에 있는 구슬 먼저
  }
  return first;
}

function calculate(x1, y1, x2, y2) {
  return 1000 * x1 + 100 * y1 + 10 * x2 + y2;
}

console.log(answer);

~~~
