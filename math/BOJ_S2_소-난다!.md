https://www.acmicpc.net/problem/19699

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = [];

let isSosu = new Array(10000).fill(true);
isSosu[0] = false;
isSosu[1] = false;
for (let i = 2; i < 10000; i++) {
  if (!isSosu[i]) {
    continue;
  }
  for (let j = 2 * i; j < 10000; j += i) {
    isSosu[j] = false;
  }
}

let set = new Set();
dfs(0, 0, 0);

function dfs(end, start, sum) {
  if (end === m) {
    if (isSosu[sum]) {
      set.add(sum);
    }
    return;
  }
  for (let i = start; i < n; i++) {
    dfs(end + 1, i + 1, sum + arr[i]);
  }
}

if (set.size === 0) {
  answer = "-1";
} else {
  answer = Array.from(set)
    .sort((a, b) => a - b)
    .join(" ");
}

console.log(answer);

~~~
