https://www.acmicpc.net/problem/1912

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = arr[0];

let dp = new Array(n).fill(0);
dp[0] = arr[0];

for (let i = 1; i < n; i++) {
  dp[i] = Math.max(dp[i - 1] + arr[i], arr[i]);
  answer = Math.max(answer, dp[i]);
}

console.log(answer);
~~~

i번째 수를 넣을건데, i번째 수가 시작점이 될래? 라고 물어본다  
[arr] 10 -4 3 1 5 6 -35 12 21 -1  
[dp] 10 6 9 10 15 21 -14 12 33 32  
