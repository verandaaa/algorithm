https://www.acmicpc.net/problem/1446

# Solution 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n, d] = input[0].split(" ").map((v) => v * 1);
let edges = input
  .slice(1, input.length)
  .map((v) => v.split(" ").map((x) => x * 1));

//<------------input
class Edge {
  constructor(t, w) {
    this.t = t;
    this.w = w;
  }
}
let answer = 0;

let dis = Array.from(Array(d + 1), () => Infinity);
let adj = Array.from(Array(d + 1), () => []);

for (let i = 0; i < d; i++) {
  //(0,1,1) (1,2,1) ... (99,100,1) 간선 추가
  adj[i].push(new Edge(i + 1, 1));
}
for (let edge of edges) {
  //지름길 간선 추가
  if (edge[1] > d)
    //범위 초과
    continue;
  adj[edge[0]].push(new Edge(edge[1], edge[2]));
}

dis[0] = 0; //시작 점 0
let queue = [0];

while (queue.length) {
  let q = queue.shift();

  for (let i = 0; i < adj[q].length; i++) {
    let to = adj[q][i];
    if (dis[q] + to.w < dis[to.t]) {
      //다익스트라
      dis[to.t] = dis[q] + to.w;
      queue.push(to.t);
    }
  }
}

answer = dis[d];

console.log(answer);

~~~

거리의 최솟값, 길이의 최솟값, 간선 정보가 주어지면 최단거리 알고리즘을 떠올리자 !!  
<br/><br/><br/>



# node.js 환경 readLine으로 입력받는 방식
~~~javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  solution(input);
  process.exit();
});

function solution(input) {
  //문제 풀이
}

~~~
