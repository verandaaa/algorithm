https://www.acmicpc.net/problem/14722

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

let dx = [0, -1];
let dy = [-1, 0];

//우유종류 메모
let map = new Array(n + 1).fill().map(() => new Array(n + 1));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    map[i + 1][j + 1] = arr[i][j];
  }
}

//0만 dp값 1로 초기화
let dp = new Array(3).fill().map(() => new Array(n + 1).fill().map(() => new Array(n + 1).fill(0)));
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    if (map[i][j] === 0) {
      dp[0][i][j] = 1;
    }
  }
}

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    //현재우유, 이전우유
    let m = map[i][j];
    let pm = (m + 2) % 3;
    //위,왼쪽에 대해서
    for (let d = 0; d < 2; d++) {
      //이전 좌표
      let pi = i + dx[d];
      let pj = j + dy[d];

      //우유 안먹음
      //첫번째 인덱스는 마지막으로 먹은 우유 정보이다
      dp[0][i][j] = Math.max(dp[0][i][j], dp[0][pi][pj]);
      dp[1][i][j] = Math.max(dp[1][i][j], dp[1][pi][pj]);
      dp[2][i][j] = Math.max(dp[2][i][j], dp[2][pi][pj]);

      //우유 먹음
      //현재 우유가 이전 우유에서 이어진다면 +1 한다
      if (dp[pm][pi][pj] > 0) {
        dp[m][i][j] = Math.max(dp[m][i][j], dp[pm][pi][pj] + 1);
      }
    }
  }
}

answer = Math.max(dp[0][n][n], dp[1][n][n], dp[2][n][n]);

console.log(answer);

~~~
