https://www.acmicpc.net/problem/21278

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";
let maxValue = Infinity;
let maxIndex = [-1, -1];

//플로이드 워셜 시작
let dis = new Array(n + 1).fill().map(() => new Array(n + 1).fill(Infinity));

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    if (i === j) {
      dis[i][j] = 0;
    }
  }
}

for (let [a, b] of arr) {
  dis[a][b] = 1;
  dis[b][a] = 1;
}

for (let k = 1; k <= n; k++) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      dis[i][j] = Math.min(dis[i][j], dis[i][k] + dis[k][j]);
    }
  }
}
//플로이드 워셜 끝

//i,j로 치킨집 두개 선정
for (let i = 1; i <= n - 1; i++) {
  for (let j = i + 1; j <= n; j++) {
    let sum = 0;
    //모든 노드에 대해서 가까운 치킨집에 대한 거리 측정
    for (let k = 1; k <= n; k++) {
      sum += Math.min(dis[i][k], dis[j][k]);
    }
    //최소 거리를 갱신할 경우
    if (sum < maxValue) {
      maxValue = sum;
      maxIndex = [i, j];
    }
  }
}

answer = maxIndex.join(" ") + " " + maxValue * 2;

console.log(answer);

~~~
