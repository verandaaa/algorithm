https://www.acmicpc.net/problem/20002

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let map = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = -Infinity;

//map 복사
let sums = new Array(n + 1).fill().map(() => new Array(n + 1).fill(0));
for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < n + 1; j++) {
    sums[i][j] = map[i - 1][j - 1];
  }
}

//누적합 구하기
for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < n + 1; j++) {
    sums[i][j] = sums[i][j] + sums[i - 1][j] + sums[i][j - 1] - sums[i - 1][j - 1];
  }
}

//총이익 구하기
for (let k = 1; k <= n; k++) {
  for (let i = 1; i < n + 2 - k; i++) {
    for (let j = 1; j < n + 2 - k; j++) {
      answer = Math.max(
        answer,
        sums[i + k - 1][j + k - 1] - sums[i + k - 1][j - 1] - sums[i - 1][j + k - 1] + sums[i - 1][j - 1]
      );
    }
  }
}

console.log(answer);

~~~
