https://www.acmicpc.net/problem/11568

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//let arr = input.slice(1, input.length).map((v) => v.split(" ").map(Number));

//<------------input
let answer = 0;

arr.unshift(0);
let dp = Array.from(Array(n + 1), () => 0);

for (let i = 1; i < n + 1; i++) {
  //arr[i]를 수열에 포함시킬때의 경우
  for (let j = 0; j < i; j++) {
    if (arr[i] > arr[j]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}
answer = Math.max(...dp);

console.log(answer);

//arr -> 0 10 20 30 5 10 20 30 40
//dp  -> 0  1  2  3 1  2  3  4  5

~~~
