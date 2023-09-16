https://www.acmicpc.net/problem/11265

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let map = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
let arr = input.slice(1 + n, 1 + n + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";

for (let k = 0; k < n; k++) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      map[i][j] = Math.min(map[i][j], map[i][k] + map[k][j]);
    }
  }
}

for (let [from, to, weigth] of arr) {
  if (map[from - 1][to - 1] <= weigth) {
    answer += "Enjoy other party\n";
  } else {
    answer += "Stay here\n";
  }
}

console.log(answer);

~~~
