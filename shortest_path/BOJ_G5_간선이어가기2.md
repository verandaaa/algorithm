https://www.acmicpc.net/problem/14284

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
let [s, t] = input[1 + m].split(" ").map(Number);
//<------------input
let answer = 0;

let edges = new Array(n + 1).fill().map(() => []);
for (let [a, b, w] of arr) {
  edges[a].push([b, w]);
  edges[b].push([a, w]);
}

let queue = [s];
let visit = new Array(n + 1).fill(Infinity);
visit[s] = 0;
while (queue.length) {
  let from = queue.shift();

  for (let [to, weight] of edges[from]) {
    if (visit[from] + weight < visit[to]) {
      visit[to] = visit[from] + weight;
      queue.push(to);
    }
  }
}
answer = visit[t];

console.log(answer);

~~~
