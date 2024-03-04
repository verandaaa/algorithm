https://www.acmicpc.net/problem/1301

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map(Number);
//<------------input
let answer = 0;

let balls = new Array(6).fill().map((_, i) => (i >= 1 && i <= n ? arr[i - 1] : 0));
let dp = new Array(6)
  .fill()
  .map(() =>
    new Array(6)
      .fill()
      .map(() =>
        new Array(11)
          .fill()
          .map(() =>
            new Array(11)
              .fill()
              .map(() => new Array(11).fill().map(() => new Array(11).fill().map(() => new Array(11).fill(-1))))
          )
      )
  );
let ballTotal = balls.reduce((a, b) => a + b, 0);

answer = dfs(0, 0, 0);

function dfs(prev2, prev, cnt) {
  //모든 공을 다 썼다
  if (cnt === ballTotal) {
    return 1;
  }

  //이미 검사한 곳이면 리턴
  let res = dp[prev2][prev][balls[1]][balls[2]][balls[3]][balls[4]][balls[5]];
  if (res !== -1) {
    return res;
  }

  //두번전, 하나전 공과 일치하지 않아야 하고, 공이 존재 할 경우 dfs 돌기
  res = 0;
  for (let i = 1; i <= n; i++) {
    if (prev2 !== i && prev !== i && balls[i] > 0) {
      balls[i]--;
      res += dfs(prev, i, cnt + 1);
      balls[i]++;
    }
  }
  dp[prev2][prev][balls[1]][balls[2]][balls[3]][balls[4]][balls[5]] = res;

  return res;
}

console.log(answer);

~~~
