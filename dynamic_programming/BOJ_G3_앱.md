https://www.acmicpc.net/problem/7579

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let byte = input[1].split(" ").map(Number);
let cost = input[2].split(" ").map(Number);
//<------------input

let answer = Infinity;

byte.unshift(0);
cost.unshift(0);
let dp = Array.from(Array(n + 1), () => Array(10001).fill(0));

for (let i = 1; i < n + 1; i++) {
  for (let j = 0; j < 10001; j++) {
    if (cost[i] > j) {
      dp[i][j] = dp[i - 1][j];
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], byte[i] + dp[i - 1][j - cost[i]]);
    }
    if (dp[i][j] >= m) {
      answer = Math.min(answer, j);
    }
  }
}

console.log(answer);

~~~

무게와 가치가 제공되고 최대or최소를 구해야 한다면 배낭 알고리즘을 생각하자  
열을 무게로 두게 되면 무게값이 최대 10000000임으로 메모리초과가 발생한다  
열을 가치로 두게 되면 n이 최대 100, 가치가 최대 100이므로 최대 10000이다  
