https://www.acmicpc.net/problem/3980

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [t] = input[0].split(" ").map(Number);
//<------------input

let map, check, answer;
for (let tc = 0; tc < t; tc++) {
  map = input
    .slice(1 + tc * 11, 1 + (tc + 1) * 11)
    .map((v) => v.split(" ").map(Number));
  check = Array.from(Array(11), () => false);
  answer = 0;
  dfs(0, 0);
  console.log(answer);
}

function dfs(i, sum) {
  if (i === 11) {
    answer = Math.max(answer, sum);
    return;
  }
  for (let j = 0; j < 11; j++) {
    if (map[i][j] === 0) {
      continue;
    }
    if (check[j]) {
      continue;
    }
    check[j] = true;
    dfs(i + 1, sum + map[i][j]);
    check[j] = false;
  }
}

~~~
