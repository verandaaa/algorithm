https://www.acmicpc.net/problem/3067

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [t] = input[0].split(" ").map(Number);
//<------------input
let answer = "";

for (let tc = 0; tc < t; tc++) {
  let [n] = input[1 + tc * 3].split(" ").map(Number);
  let arr = input[2 + tc * 3].split(" ").map(Number);
  let [m] = input[3 + tc * 3].split(" ").map(Number);
  let dp = Array.from(Array(m + 1), () => 0);
  dp[0] = 1;

  for (let unit of arr) {
    for (let i = 0; i < m + 1; i++) {
      if (i >= unit) {
        dp[i] += dp[i - unit];
      }
    }
  }
  console.log(dp[m]);
}

console.log(answer);

~~~
