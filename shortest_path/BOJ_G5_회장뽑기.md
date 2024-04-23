https://www.acmicpc.net/problem/2660

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, input.length - 1).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";

let dis = new Array(n + 1).fill().map(() => new Array(n + 1).fill(Infinity));
for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < n + 1; j++) {
    if (i === j) {
      dis[i][j] = 0;
    }
  }
}

for (let [a, b] of arr) {
  dis[a][b] = 1;
  dis[b][a] = 1;
}

for (let k = 1; k < n + 1; k++) {
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      dis[i][j] = Math.min(dis[i][j], dis[i][k] + dis[k][j]);
    }
  }
}

let count = new Array(n + 1).fill(0);
let minValue = Infinity;
let minList = [];
for (let i = 1; i < n + 1; i++) {
  //점수는 가장 먼 친구를 기준으로 한다
  for (let j = 1; j < n + 1; j++) {
    count[i] = Math.max(count[i], dis[i][j]);
  }
  //점수가 최소를 갱신한다면 새로 갈아치움
  if (count[i] < minValue) {
    minValue = count[i];
    minList = [i];
  }
  //점수가 최소랑 같으면 추가함
  else if (count[i] === minValue) {
    minList.push(i);
  }
}

answer += minValue + " " + minList.length + "\n";
answer += minList.join(" ");

console.log(answer);

~~~


예를 들어 어느 회원이 다른 모든 회원과 친구이면, 이 회원의 점수는 1점이다. 어느 회원의 점수가 2점이면, 다른 모든 회원이 친구이거나 친구의 친구임을 말한다. 또한 어느 회원의 점수가 3점이면, 다른 모든 회원이 친구이거나, 친구의 친구이거나, 친구의 친구의 친구임을 말한다.  
=> 친구의 친구의 친구의... 일때마다 1점씩 추가됨, 최대한 친구를 많이 안거치고 연결되어야 함 => 플로이드워셜  
