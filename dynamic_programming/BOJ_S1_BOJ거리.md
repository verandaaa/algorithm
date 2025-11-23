https://www.acmicpc.net/problem/12026

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1];
//<------------input
let answer = 0;

let next = {
  B: "O",
  O: "J",
  J: "B",
};

let dp = new Array(n).fill(Infinity);
dp[0] = 0;
for (let i = 0; i < n; i++) {
  if (dp[i] === Infinity) {
    continue;
  }
  for (let j = i + 1; j < n; j++) {
    if (next[arr[i]] === arr[j]) {
      dp[j] = Math.min(dp[j], dp[i] + (j - i) ** 2);
    }
  }
}

answer = dp[n - 1] === Infinity ? -1 : dp[n - 1];

console.log(answer);

~~~

