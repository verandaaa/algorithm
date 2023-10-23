https://www.acmicpc.net/problem/21940

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
let [k] = input[1 + m].split(" ").map(Number);
let arr2 = input[1 + m + 1].split(" ").map(Number);
//<------------input
let answer = [];

let dis = Array.from(Array(n + 1), () => Array(n + 1).fill(Infinity));
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    if (i == j) {
      dis[i][j] = 0;
    }
  }
}
for (let [f, t, w] of arr) {
  dis[f][t] = w;
}
for (let c = 1; c <= n; c++) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      dis[i][j] = Math.min(dis[i][j], dis[i][c] + dis[c][j]);
    }
  }
}
let min = Infinity;
for (let i = 1; i <= n; i++) {
  //선정 도시
  let max = 0;
  for (let x of arr2) {
    //친구 도시
    max = Math.max(max, dis[x][i] + dis[i][x]); //왕복 시간
  }
  if (max < min) {
    min = max;
    answer = [i];
  } else if (max === min) {
    answer.push(i);
  }
}
answer = answer.sort((a, b) => a - b).join(" ");

console.log(answer);

~~~
