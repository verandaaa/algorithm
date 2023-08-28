https://www.acmicpc.net/problem/17216

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
//<------------input

let answer = 0;

arr.unshift(Infinity);
let dp = Array.from(Array(n + 1), () => 0);

for (let i = 1; i < n + 1; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[i] < arr[j]) {
      dp[i] = Math.max(dp[i], dp[j] + arr[i]);
    }
  }
}
answer = Math.max(...dp);

console.log(answer);

~~~

LIS의 길이를 구하려면 +1을 하면 되고, 값을 구하려고 하니 arr[i]를 더하였다  
또한 100 1 같이 dp값이 같은채로 끝나면 마지막 값이 꼭 max라고 볼 수 없으므로 dp값중 max값을 구한다  
