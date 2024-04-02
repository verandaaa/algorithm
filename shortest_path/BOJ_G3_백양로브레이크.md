https://www.acmicpc.net/problem/11562

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr1 = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
let [l] = input[1 + m].split(" ").map(Number);
let arr2 = input.slice(2 + m, 2 + m + +l).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";

//일단 모두 양방향으로 간선을 잇고,
//인위적으로 이은 여부를 체크한다
let isConnect = new Array(n + 1).fill().map(() => new Array(n + 1).fill(false));
let edges = new Array(n + 1).fill().map(() => []);
for (let [a, b, c] of arr1) {
  isConnect[a][b] = true;
  if (c === 1) {
    isConnect[b][a] = true;
  }
  edges[a].push(b);
  edges[b].push(a);
}

//모든 시작점에서 모든 노드를 탐색하며
let count = new Array(n + 1).fill().map(() => new Array(n + 1).fill(Infinity));
for (let start = 1; start <= n; start++) {
  let queue = [start];
  count[start][start] = 0;

  while (queue.length) {
    let from = queue.shift();

    //이어진 간선들 중에서
    for (let to of edges[from]) {
      //원래 이어진 간선이라면 count 유지
      if (isConnect[from][to]) {
        if (count[start][from] < count[start][to]) {
          count[start][to] = count[start][from];
          queue.push(to);
        }
      }
      //강제로 이은 간선이라면 count 증가
      else {
        if (count[start][from] + 1 < count[start][to]) {
          count[start][to] = count[start][from] + 1;
          queue.push(to);
        }
      }
    }
  }
}

for (let [a, b] of arr2) {
  answer += count[a][b] + "\n";
}

console.log(answer);

~~~

# Pass 2 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr1 = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
let [l] = input[1 + m].split(" ").map(Number);
let arr2 = input.slice(2 + m, 2 + m + +l).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";

let dis = new Array(n + 1).fill().map(() => new Array(n + 1).fill(Infinity));

for (let i = 1; i <= n; i++) {
  dis[i][i] = 0;
}

for (let [a, b, c] of arr1) {
  if (c === 0) {
    dis[a][b] = 0;
    dis[b][a] = 1;
  } else {
    dis[a][b] = 0;
    dis[b][a] = 0;
  }
}

for (let k = 1; k <= n; k++) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      dis[i][j] = Math.min(dis[i][j], dis[i][k] + dis[k][j]);
    }
  }
}

for (let [a, b] of arr2) {
  answer += dis[a][b] + "\n";
}

console.log(answer);

~~~

1번을 더 응용했으면 됐는데....  
이미 이어진 간선을 이동할때는 비용이 0이들고, 강제로 이은 간선을 이동할때는 비용이 1이 든다고 하고  
n<=250이므로 플로이드 워셜을 돌리면 된다  
