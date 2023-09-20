https://www.acmicpc.net/problem/12908

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [xs, ys] = input[0].split(" ").map(Number);
let [xe, ye] = input[1].split(" ").map(Number);
let arr = input.slice(2, 5).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

let arr2 = [];
for (let i = 0; i < 3; i++) {
  arr2.push(arr[i].slice(0, 2));
  arr2.push(arr[i].slice(2, 4));
}
let node = [[xs, ys], ...arr2, [xe, ye]]; //출발1, 텔포6, 도착1

//초기화 시키기
let dis = Array.from(Array(8), () => Array(8).fill(Infinity));
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    if (i == j) {
      dis[i][j] = 0;
    }
  }
}
//간선 정보 업데이트
dis[0][7] = getJumpTime(xs, ys, xe, ye); //출발지 -> 도착지
//모든 지점 서로
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    dis[i][j] = getJumpTime(node[i][0], node[i][1], node[j][0], node[j][1]);
  }
}
//텔레포트 <-> 텔레포트
for (let i = 1; i <= 6; i += 2) {
  dis[i][i + 1] = Math.min(
    10,
    getJumpTime(node[i][0], node[i][1], node[i + 1][0], node[i + 1][1])
  );
  dis[i + 1][i] = Math.min(
    10,
    getJumpTime(node[i][0], node[i][1], node[i + 1][0], node[i + 1][1])
  );
}

//플로이드
for (let k = 0; k < 8; k++) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      dis[i][j] = Math.min(dis[i][j], dis[i][k] + dis[k][j]);
    }
  }
}
answer = dis[0][7];

function getJumpTime(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

console.log(answer);

~~~

좌표값이 10억x10억 이여서, 전부 visit[][]하면 메모리 초과, bfs하면 시간 초과 발생  
입력의 8개의 좌표만 지점으로 세운다  
8개의 지점에 대해 서로 점프만 하는 기준으로 시간을 계산하고  
6개의 지점에 대해 텔레포트가 가능한 좌표끼리 시간을 계산한다  
