https://www.acmicpc.net/problem/16194

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = 0;

let dp = new Array(n + 1).fill().map(() => new Array(n + 1).fill(Infinity));
for (let i = 1; i <= n; i++) {
  dp[i][0] = 0;
}

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    if (i > j) {
      dp[i][j] = dp[i - 1][j];
    } else {
      dp[i][j] = Math.min(dp[i - 1][j], arr[i - 1] + dp[i][j - i]);
    }
  }
}
answer = dp[n][n];

console.log(answer);

~~~
