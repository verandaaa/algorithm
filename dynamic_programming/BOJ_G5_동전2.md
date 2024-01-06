https://www.acmicpc.net/problem/2294

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map(Number);
//<------------input
let answer = 0;

let dp = new Array(m + 1).fill(-1);
dp[0] = 0;

for (let i = 0; i < n; i++) {
  for (let j = 1; j < m + 1; j++) {
    if (j < arr[i]) {
      continue;
    }
    if (dp[j] === -1 && dp[j - arr[i]] === -1) {
      continue;
    } //
    else if (dp[j] === -1) {
      dp[j] = dp[j - arr[i]] + 1;
    } //
    else if (dp[j - arr[i]] === -1) {
      continue;
    } //
    else {
      dp[j] = Math.min(dp[j], dp[j - arr[i]] + 1);
    }
  }
}

answer = dp[m];

console.log(answer);

~~~
