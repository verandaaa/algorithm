https://www.acmicpc.net/problem/1535

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr1 = input[1].split(" ").map(Number);
let arr2 = input[2].split(" ").map(Number);
//<------------input
let answer = 0;

let dp = new Array(n + 1).fill().map(() => new Array(100).fill(0));
for (let i = 1; i <= n; i++) {
  for (let j = 0; j < 100; j++) {
    if (j - arr1[i - 1] < 0) {
      dp[i][j] = dp[i - 1][j];
    } else {
      dp[i][j] = Math.max(
        dp[i - 1][j],
        dp[i - 1][j - arr1[i - 1]] + arr2[i - 1]
      );
    }
  }
}

answer = dp[n][99];

console.log(answer);

~~~
