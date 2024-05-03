https://www.acmicpc.net/problem/4811

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let arr = input.slice(0, input.length - 1).map(Number);
//<------------input
let answer = "";

let dp = new Array(31).fill().map(() => new Array(31).fill(0));
for (let i = 0; i <= 30; i++) {
  dp[i][0] = 1;
}

for (let i = 1; i <= 30; i++) {
  for (let j = 1; j <= 30; j++) {
    let w = i;
    let h = j;
    if (w < h) {
      continue;
    }
    dp[w][h] = dp[w - 1][h] + dp[w][h - 1];
  }
}

for (let x of arr) {
  answer += dp[x][x] + "\n";
}

console.log(answer);

~~~

dp[i][0]은 1로 초기화한다. W만 사용하는 경우의 수는 1일 수밖에 없기 때문이다  
W의 사용 횟수는 무조건 H이상이어야 한다
  
dp[2][1], 즉 w가 2번, h가 1번 사용된 문자열 경우의 수를 구하려고 한다  
dp[1][1] (+W)과 dp[2][0] (+h)의 합이 될 것이다  
  
|  | 1 | 2 |
|----------|----------|----------|
| 1| |↓|
| 2|→|dp[w][h]|
  
따라서 이중 for문을 위 코드와 같이 돌리게 하였음  

