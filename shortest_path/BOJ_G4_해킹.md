https://www.acmicpc.net/problem/10282

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [t] = input[0].split(" ").map(Number);
//<------------input
let answer = "";

let index = 1;
for (let tc = 0; tc < t; tc++) {
  let [n, d, c] = input[index++].split(" ").map(Number);
  let arr = input.slice(index, (index += d)).map((v) => v.split(" ").map(Number));

  //간선 생성
  let edges = new Array(n + 1).fill().map(() => []);
  for (let [a, b, c] of arr) {
    edges[b].push([a, c]);
  }

  let visit = new Array(n + 1).fill(Infinity);
  visit[c] = 0;
  let queue = [c];
  let [count, time] = [0, 0];
  //출발점으로부터 컴퓨터를 점점 감염시키기
  //감염시간이 곧 최단거리임
  while (queue.length) {
    let newQueue = [];

    for (let from of queue) {
      for (let [to, weight] of edges[from]) {
        if (visit[from] + weight >= visit[to]) {
          continue;
        }
        visit[to] = visit[from] + weight;
        newQueue.push(to);
      }
    }

    queue = newQueue;
  }
  //최단거리 중 가장 큰 값이 마지막 컴퓨터가 감염되기 까지 걸리는 시간
  for (let v of visit) {
    if (v !== Infinity) {
      count++;
      time = Math.max(time, v);
    }
  }

  answer += count + " " + time + "\n";
}

console.log(answer);

~~~
