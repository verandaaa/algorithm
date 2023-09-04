https://www.acmicpc.net/problem/9084

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
let answer = "";

for (let tc = 0; tc < t; tc++) {
  let n = input[1 + tc * 3] * 1;
  let coin = input[2 + tc * 3].split(" ").map(Number);
  coin.unshift(0);
  let goal = input[3 + tc * 3] * 1;

  let dp = Array.from(Array(n + 1), () => Array(goal + 1).fill(0));
  for (let i = 1; i < n + 1; i++) {
    dp[i][0] = 1; //0원을 나타낼 수 있는 개수 : 1
    for (let j = 1; j < goal + 1; j++) {
      if (j >= coin[i]) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - coin[i]];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  answer += dp[n][goal] + "\n";
}

console.log(answer);

~~~

초기 조건을 잘 설정하자  
