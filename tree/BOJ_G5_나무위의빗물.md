https://www.acmicpc.net/problem/17073

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

let edges = new Array(n + 1).fill().map(() => []);
for (let [a, b] of arr) {
  edges[a].push(b);
  edges[b].push(a);
}

let bottom = 0;
let visit = new Array(n + 1).fill(false);
visit[1] = true;
let queue = [1];

while (queue.length) {
  let newQueue = [];

  for (let from of queue) {
    //아래로 갈 수 있나?
    let count = 0;
    for (let to of edges[from]) {
      if (!visit[to]) {
        visit[to] = true;
        newQueue.push(to);
        count++;
      }
    }

    //맨 바닥이면 체크
    if (count === 0) {
      bottom++;
    }
  }

  queue = newQueue;
}

answer = m / bottom;

console.log(answer);

~~~
