https://www.acmicpc.net/problem/22871

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = 0;

const dp = new Array(n).fill(Infinity);
dp[0] = 0;

//i번째 돌에 대한 최소 K값을 찾으려고 한다
for (let i = 1; i < n; i++) {
  //내 앞의 돌들(j)에 대해서 검사
  for (let j = 0; j < i; j++) {
    //i번째 돌에 대한 최소값은, j돌까지의 최소값과 j돌에서 i돌까지의 계산값 중 큰 값과 비교해야함
    dp[i] = Math.min(
      dp[i],
      Math.max(dp[j], (i - j) * (1 + Math.abs(arr[i] - arr[j])))
    );
  }
}

answer = dp[n - 1];

console.log(answer);

~~~
