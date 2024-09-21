https://www.acmicpc.net/problem/17484

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

let dp = new Array(n)
  .fill()
  .map(() => new Array(m).fill().map(() => new Array(3).fill(0)));
for (let j = 0; j < m; j++) {
  for (let k = 0; k < 3; k++) {
    dp[0][j][k] = arr[0][j];
  }
}

for (let i = 1; i < n; i++) {
  for (let j = 0; j < m; j++) {
    for (let k = 0; k < 3; k++) {
      let min = Infinity;
      for (let l = 0; l < 3; l++) {
        if (k === l) {
          continue;
        }
        if (j + (k - 1) < 0 || j + (k - 1) >= m) {
          continue;
        }
        min = Math.min(min, arr[i][j] + dp[i - 1][j + (k - 1)][l]);
      }
      dp[i][j][k] = min;
    }
  }
}
answer = Math.min(...dp[n - 1].flat());

console.log(answer);

// ex) 위에서 일자로 내려온다 치면, 위에건 대각방향으로 받은 값을 사용해야함...
// dp[i][j][0] = dp[i-1][j-1][1] or dp[i-1][j-1][2]
// dp[i][j][1] = dp[i-1][j][0] or dp[i-1][j][2]
// dp[i][j][2] = dp[i-1][j+1][0] or dp[i-1][j+1][1]

~~~
