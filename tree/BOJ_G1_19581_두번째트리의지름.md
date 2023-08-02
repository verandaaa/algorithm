https://www.acmicpc.net/problem/19581

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, input.length).map((v) => v.split(" ").map(Number));
//<------------input

let answer = [];

let edges = Array.from(Array(n + 1), () => []);
for (let [from, to, weight] of arr) {
  edges[from].push([to, weight]);
  edges[to].push([from, weight]);
}
// console.log(edges);

//a: 루트(임의)로부터 제일 멀리 떨어진 노드
//b: a로부터 제일 멀리 떨어진 노드
//a<->b가 가장 큰 지름
//우리가 구할것은 두번째 큰 지름이므로
//출발:a 도착:?(b제외), 출발:b 도착:?(a제외)
//둘 중 큰값이 답
let [aNode, aVal] = bfs(1);
// console.log("a", aNode, aVal);
let [bNode, bVal] = bfs(aNode);
// console.log("b", bNode, bVal);
let [cNode, cVal] = bfs(aNode, bNode);
// console.log("a", cNode, cVal);
let [dNode, dVal] = bfs(bNode, aNode);
// console.log("b", dNode, dVal);

answer = Math.max(cVal, dVal);

console.log(answer);

function bfs(start, except) {
  let queue = [start];
  let visited = Array.from(Array(n + 1), () => false);
  visited[start] = true;
  visited[except] = true;
  let distance = Array.from(Array(n + 1), () => 0);
  let val = 0;
  let node = -1;

  while (queue.length) {
    let newQueue = [];

    for (let from of queue) {
      for (let i = 0; i < edges[from].length; i++) {
        let to = edges[from][i][0];
        let weight = edges[from][i][1];
        if (visited[to]) {
          continue;
        }
        visited[to] = true;
        distance[to] = distance[from] + weight;
        newQueue.push(to);
        if (distance[to] > val) {
          val = distance[to];
          node = to;
        }
      }
    }

    queue = newQueue;
  }
  //console.log(distance);

  return [node, val];
}

~~~

두 점 사이의 거리라고 해서 플로이드워셜은 불가능하다... n이 최대 10만이기 때문  
이후 시간초과를 해결하려고 했으나 전혀 답이 안떠올라 풀이를 보았다  
https://blog.naver.com/occidere/220961873786  
수학공식이라고 생각하고 아 이런 문제는 이렇게 푸는 거구나 이해만 하고 넘어가면 될 것 같다  
