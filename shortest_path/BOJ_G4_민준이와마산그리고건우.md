https://www.acmicpc.net/problem/18223

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [v, e, p] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + e).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "GOOD BYE";

//간선리스트 만들기
let edges = new Array(v + 1).fill().map(() => []);
for (let [a, b, c] of arr) {
  edges[a].push([b, c]);
  edges[b].push([a, c]);
}

//탐색하면서 최단경로값를 갱신하면, 가려는 노드의 이전노드 정보를 초기화
//최단경로값과 일치한다면, 가려는 노드의 이전노드 정보에 추가
let prevNode = new Array(v + 1).fill().map(() => new Set());
let distance = new Array(v + 1).fill(Infinity);
distance[1] = 0;
let queue = [1];
while (queue.length) {
  let from = queue.shift();

  for (let [to, weight] of edges[from]) {
    if (distance[from] + weight < distance[to]) {
      distance[to] = distance[from] + weight;
      queue.push(to);
      prevNode[to].clear();
      prevNode[to].add(from);
    } //
    else if (distance[from] + weight === distance[to]) {
      queue.push(to);
      prevNode[to].add(from);
    }
  }
}

//마지막 노드로부터 처음으로 되돌아가면서 친구를 만나는지 확인
let visit = new Array(v + 1).fill(false);
visit[v] = true;
queue = [v];
while (queue.length) {
  let to = queue.shift();

  if (to === p) {
    answer = "SAVE HIM";
  }

  for (let from of prevNode[to]) {
    if (!visit[from]) {
      queue.push(from);
      visit[from] = true;
    }
  }
}

console.log(answer);

~~~
1부터 시작해서 v까지 지나온 노드를 메모하며 최단거리가 되도록 이동한다  
도착점부터 메모한 노드를 바탕으로 역탐색헤서 p가 존재하는지 확인한다  

# Pass 2 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [v, e, p] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + e).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "GOOD BYE";

//간선리스트 만들기
let edges = new Array(v + 1).fill().map(() => []);
for (let [a, b, c] of arr) {
  edges[a].push([b, c]);
  edges[b].push([a, c]);
}

//시작점부터 다익스트라로 최단거리 배열 구하기
function dijkstra(start) {
  let distance = new Array(v + 1).fill(Infinity);
  distance[start] = 0;
  let queue = [start];
  while (queue.length) {
    let from = queue.shift();

    for (let [to, weight] of edges[from]) {
      if (distance[from] + weight <= distance[to]) {
        distance[to] = distance[from] + weight;
        queue.push(to);
      }
    }
  }
  return distance;
}

//p가 최단거리에 포함이 된다면?
//1부터 p + p부터 끝 === 1부터 끝
let distance1 = dijkstra(1);
let distance2 = dijkstra(p);

if (distance1[p] + distance2[v] === distance1[v]) {
  answer = "SAVE HIM";
}

console.log(answer);

~~~
p가 최단거리에 포함이 된다는 뜻은, p를 무조건 거친다는 것  
따라서 1부터 p까지, 그리고 p에서 v까지의 거리의 합이 곧 1부터 v까지의 거리와 일치한다  
