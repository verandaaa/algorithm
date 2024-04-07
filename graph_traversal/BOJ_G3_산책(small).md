https://www.acmicpc.net/problem/22868

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
let [s, e] = input[1 + m].split(" ").map(Number);
//<------------input
let answer = 0;

//간선 만들기, 이어진 노드 오름차순으로 정렬하기
let edges = new Array(n + 1).fill().map(() => []);
for (let [a, b] of arr) {
  edges[a].push(b);
  edges[b].push(a);
}
for (let i = 1; i <= n; i++) {
  edges[i].sort((a, b) => a - b);
}

//해당 노드가 어디로부터 온건지
let parent = new Array(n + 1).fill(null);
parent[s] = null;
//갈 고려조차 하지 않는 곳
let visit = new Array(n + 1).fill(false);

//s->e
bfs(s, e);

//갔던길 다시 못가게 하기 위해 처리
let x = e;
while (parent[x] !== null) {
  visit[x] = true;
  x = parent[x];
}

//e->s
bfs(e, s);

function bfs(start, end) {
  dis = new Array(n + 1).fill(Infinity);
  dis[start] = 0;
  queue = [start];
  while (queue.length) {
    let from = queue.shift();

    for (let to of edges[from]) {
      if (!visit[to] && dis[from] + 1 < dis[to]) {
        parent[to] = from; //갈때만 상관 있음
        dis[to] = dis[from] + 1;
        queue.push(to);
      }
    }
  }
  answer += dis[end];
}

console.log(answer);

~~~
