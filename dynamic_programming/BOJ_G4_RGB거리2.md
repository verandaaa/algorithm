https://www.acmicpc.net/problem/17404

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));

//<------------input

let answer = Infinity;

for (let start = 0; start < 3; start++) {
  //시작점 3가지에 대해서
  let dp = Array.from(Array(n), () => Array(3).fill(Infinity));
  dp[0][start] = arr[0][start];
  for (let i = 1; i < n - 1; i++) {
    for (let j = 0; j < 3; j++) {
      let a = dp[i - 1][(j + 1) % 3];
      let b = dp[i - 1][(j + 2) % 3];
      dp[i][j] = arr[i][j] + Math.min(a, b);
    }
  }
  //n번째 집은 시작점 집을 피해야함
  for (let j = 0; j < 3; j++) {
    if (j === start) {
      continue;
    }
    let a = dp[n - 2][(j + 1) % 3];
    let b = dp[n - 2][(j + 2) % 3];
    dp[n - 1][j] = arr[n - 1][j] + Math.min(a, b);
  }
  answer = Math.min(answer, Math.min(...dp[n - 1]));
}

console.log(answer);

~~~

RGB거리1이랑 풀이가 비슷함  
다만 1번째와 N번째는 다른 색깔로 칠해야 하므로  
1번째를 빨간색으로 하면, N번째는 빨간색을 피하게 체크하는 것을 추가하였음  
