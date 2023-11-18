https://www.acmicpc.net/problem/1956

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = Infinity;

let dis = Array.from(Array(n + 1), () => Array(n + 1).fill(Infinity));
for (let [a, b, c] of arr) {
  dis[a][b] = c;
}
for (let k = 1; k < n + 1; k++) {
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      dis[i][j] = Math.min(dis[i][j], dis[i][k] + dis[k][j]);
    }
  }
}
for (let i = 1; i < n + 1; i++) {
  answer = Math.min(answer, dis[i][i]);
}
answer = answer === Infinity ? -1 : answer;

console.log(answer);

~~~

n이 최대 400이라 플로이드워셜 가능함
