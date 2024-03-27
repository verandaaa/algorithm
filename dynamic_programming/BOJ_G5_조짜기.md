https://www.acmicpc.net/problem/2229

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = 0;

arr.unshift(0);

let dp = new Array(n + 1).fill(0);
for (let i = 1; i < n + 1; i++) {
  let [max, min] = [-1, Infinity];

  for (let j = i; j > 0; j--) {
    max = Math.max(max, arr[j]);
    min = Math.min(min, arr[j]);

    dp[i] = Math.max(dp[i], max - min + dp[j - 1]);
  }
}
answer = dp[n];

console.log(answer);

~~~

(2 5) (7 1) (3 4 8) (6 9 3) -> 20
  
dp[i]는 i자리 까지 사용했을 때의 최댓값이다.  
  
Ex) dp[4]를 구하려고 한다면, 뒤에서부터 1을 포함한 묶음이 어디까지 갔을 때의 값이 최대가 되는가?  
1. (2 5 7) (1) => 5  
2. (2 5) (7 1) => 9 (최대)  
3. (2) (5 7 1) => 6
  
2번의 경우 j=4에서 시작해서 j=3 까지의 점수(max-min) + j=2 시점의 최대점수값(dp[j-1])  
즉, 점화식은 dp[i] = Math.max(dp[i], max-min+dp[j-1)  
