https://www.acmicpc.net/problem/16507

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m, k] = input[0].split(" ").map(Number);
let map = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
let arr = input.slice(1 + n, 1 + n + k).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";

let sum = new Array(n + 1).fill().map(() => new Array(m + 1).fill(0));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    sum[i + 1][j + 1] = map[i][j];
  }
}
for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < m + 1; j++) {
    sum[i][j] += sum[i - 1][j] + sum[i][j - 1] - sum[i - 1][j - 1];
  }
}

for (let [a, b, c, d] of arr) {
  let total = sum[c][d] - sum[c][b - 1] - sum[a - 1][d] + sum[a - 1][b - 1];
  let count = (c - a + 1) * (d - b + 1);
  let result = Math.floor(total / count);
  answer += result + "\n";
}

console.log(answer);

~~~
