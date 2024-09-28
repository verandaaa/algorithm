https://www.acmicpc.net/problem/15724

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
let [k] = input[1 + n].split(" ").map(Number);
let arr2 = input
  .slice(1 + n + 1, 1 + n + 1 + k)
  .map((v) => v.split(" ").map(Number));
//<------------input
let answer = [];

let arr3 = new Array(n + 1).fill().map(() => new Array(m + 1).fill(0));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    arr3[i + 1][j + 1] = arr[i][j];
  }
}

let map = new Array(n + 1).fill().map(() => new Array(m + 1).fill(0));
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    map[i][j] = arr3[i][j] + map[i - 1][j] + map[i][j - 1] - map[i - 1][j - 1];
  }
}

for (let [a, b, c, d] of arr2) {
  let count = map[c][d] - map[c][b - 1] - map[a - 1][d] + map[a - 1][b - 1];
  answer.push(count);
}
answer = answer.join("\n");

console.log(answer);

~~~
