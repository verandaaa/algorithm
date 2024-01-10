https://www.acmicpc.net/problem/20924

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, r] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n - 1).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";

let edges = new Array(n + 1).fill().map(() => []);
for (let [a, b, c] of arr) {
  edges[a].push([b, c]);
  edges[b].push([a, c]);
}

let gigaNode = null;
let lastNode = null;
let visit = new Array(n + 1).fill(Infinity);
visit[0] = -1;
visit[r] = 0;
let queue = [r];
while (queue.length) {
  let newQueue = [];
  for (let from of queue) {
    lastNode = from;

    //현재 지점에서 기둥이나 가지로 뻗어나간다
    let count = 0;
    for (let [to, weight] of edges[from]) {
      if (visit[from] + weight < visit[to]) {
        visit[to] = visit[from] + weight;
        newQueue.push(to);
        count++;
      }
    }
    //아직 기가노드 발견 전이고, 2개 이상으로 뻗어나가는 가지였다면 기가노드 지정
    if (gigaNode === null && count > 1) {
      gigaNode = from;
    }
  }
  queue = newQueue;
}
//2개 이상으로 뻗어나가는 기가노드가 존재하지 않다면, 마지막 노드가 기가노드 이다
if (gigaNode === null) {
  gigaNode = lastNode;
}

//기둥의 길이는 기가노드의 시점, 가장 긴 가지는 가장 큰 길이 값에서 기둥을 뺀 것
let giLen = visit[gigaNode];
let gaLen = Math.max(...visit) - giLen;
answer = giLen + " " + gaLen;

console.log(answer);

~~~
