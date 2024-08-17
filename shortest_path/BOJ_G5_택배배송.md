# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

let list = new Array(n + 1).fill().map(() => []);
for (let [a, b, c] of arr) {
  list[a].push([b, c]);
  list[b].push([a, c]);
}
let visit = new Array(n + 1).fill(Infinity);
visit[1] = 0;
let queue = [1];
while (queue.length) {
  let from = queue.shift();

  for (let [to, weight] of list[from]) {
    if (visit[from] + weight < visit[to]) {
      visit[to] = visit[from] + weight;
      queue.push(to);
    }
  }
}

answer = visit[n];

console.log(answer);

~~~
