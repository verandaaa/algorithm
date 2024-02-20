https://www.acmicpc.net/problem/2458

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

let dis = new Array(n + 1).fill().map(() => new Array(n + 1).fill(Infinity));

//플로이드 워셜 돌리기
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    if (i === j) {
      dis[i][j] = 0;
    }
  }
}

for (let [a, b] of arr) {
  dis[a][b] = 1;
}

for (let k = 1; k <= n; k++) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      dis[i][j] = Math.min(dis[i][j], dis[i][k] + dis[k][j]);
    }
  }
}

//가는 화살표 개수, 오는 화살표 개수 구하기
let fromCount = new Array(n + 1).fill(0);
let toCount = new Array(n + 1).fill(0);
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    if (i === j) {
      continue;
    }
    if (dis[i][j] !== Infinity) {
      fromCount[i]++;
    }
    if (dis[j][i] !== Infinity) {
      toCount[i]++;
    }
  }
}

//화살표 개수를 체크해서 등수가 확실한 학생 구하기(오고 가는 화살표를 전부 포함해야 함)
for (let k = 1; k <= n; k++) {
  if (fromCount[k] + toCount[k] === n - 1) {
    answer++;
  }
}

console.log(answer);

~~~
