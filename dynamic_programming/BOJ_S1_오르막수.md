https://www.acmicpc.net/problem/11057

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
//<------------input
let answer = 0;

let dp = new Array(n).fill().map(() => new Array(10).fill(1));
dp[0] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (let i = 1; i < n; i++) {
  for (let j = 1; j < 10; j++) {
    dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % 10007;
  }
}

answer = dp[n - 1][9];

console.log(answer);

~~~

1 2 3 4 5 6 7 8 9 10  
1 3 6 10 15 21 28 36 45 55  
1 4 10 20 35 56 84 120 165 220  
...  
그 전꺼에 이어붙인다는 느낌으로 진행됨
