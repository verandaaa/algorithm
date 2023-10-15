https://www.acmicpc.net/problem/3584

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [t] = input[0].split(" ").map(Number);
//<------------input
let answer = "";

let line = 1;
for (let tc = 0; tc < t; tc++) {
  let [n] = input[line].split(" ").map(Number);
  line++;
  let arr = input
    .slice(line, line + n - 1)
    .map((v) => v.split(" ").map(Number));
  line += n - 1;
  let [f1, f2] = input[line].split(" ").map(Number);
  line++;

  //edge 구하기
  let edges = Array.from(Array(n + 1), () => []);
  let nodes = Array.from(Array(n + 1), (_, i) => i);
  let set = new Set([...nodes]);
  set.delete(0);
  for (let [a, b] of arr) {
    edges[a].push(b);
    set.delete(b);
  }
  let root = Array.from(set)[0]; //루트 노드

  //깊이와 부모 정보를 가진 배열 구하기
  let graph = Array.from(Array(n + 1));
  graph[root] = [1, null];
  let queue = [root];
  let size = 1;
  let depth = 2;
  while (queue.length) {
    let newSize = 0;
    for (let i = 0; i < size; i++) {
      let from = queue.shift();

      for (let to of edges[from]) {
        graph[to] = [depth, from];
        queue.push(to);
        newSize++;
      }
    }
    size = newSize;
    depth++;
  }

  //깊이까지 맟춰서 값이 일치하는가
  while (true) {
    let [depth1, parent1] = graph[f1];
    let [depth2, parent2] = graph[f2];

    if (f1 === f2) {
      answer += f1 + "\n";
      break;
    }

    if (depth1 > depth2) {
      f1 = parent1;
    } else if (depth1 < depth2) {
      f2 = parent2;
    } else {
      f1 = parent1;
      f2 = parent2;
    }
  }
}

console.log(answer);

~~~
첫번째 방법은 간선 정보를 가지고 bfs탐색을 통해 깊이와 부모를 저장한다  
찾아야 할 두 노드에서 탐색을 시작해서 깊이가 같고 값이 같아지면 공통조상이다  

# Pass 2 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [t] = input[0].split(" ").map(Number);
//<------------input
let answer = "";

let line = 1;
for (let tc = 0; tc < t; tc++) {
  let [n] = input[line].split(" ").map(Number);
  line++;
  let arr = input
    .slice(line, line + n - 1)
    .map((v) => v.split(" ").map(Number));
  line += n - 1;
  let [f1, f2] = input[line].split(" ").map(Number);
  line++;

  let parents = Array.from(Array(n + 1), (_, i) => i);
  for (let [a, b] of arr) {
    parents[b] = a;
  }

  let visited = Array.from(Array(n + 1), () => false);
  visited[f1] = true;
  while (f1 !== parents[f1]) {
    f1 = parents[f1];
    visited[f1] = true;
  }
  while (!visited[f2]) {
    f2 = parents[f2];
  }
  answer += f2 + "\n";
}

console.log(answer);

~~~
두번째 방법은 부모의 노드를 담은 배열을 만든다  
a노드는 루트까지 탐색을 해서 지나온 경로를 메모한다  
b노드는 위로 탐색하면서 방문체크가 된 노드를 발견시(a노드가 탐색한 경로) 종료  
