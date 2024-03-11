https://www.acmicpc.net/problem/15681

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, r, q] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n - 1).map((v) => v.split(" ").map(Number));
let arr2 = input.slice(n, n + q).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";

let edges = new Array(n + 1).fill().map(() => []);
for (let [a, b] of arr) {
  edges[a].push(b);
  edges[b].push(a);
}

let nodes = new Array(n + 1).fill(0);
let visit = new Array(n + 1).fill(false);
dfs(r);

function dfs(from) {
  //이미 방문한 노드
  if (visit[from]) {
    return 0;
  }
  //나 1 부터 시작
  let count = 1;
  visit[from] = true;
  //자식들로 뻗어나가기
  for (let to of edges[from]) {
    count += dfs(to);
  }
  //탐사 끝냈으면 count 저장
  nodes[from] = count;
  //부모한테 count전달
  return count;
}

for (let x of arr2) {
  answer += nodes[x] + "\n";
}

console.log(answer);

~~~
