https://www.acmicpc.net/problem/11725

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";

let list = new Array(n + 1).fill().map(() => []);
let visit = new Array(n + 1).fill(-1);
for (let [a, b] of arr) {
  list[a].push(b);
  list[b].push(a);
}

let queue = [1];
while (queue.length) {
  let from = queue.shift();

  for (let to of list[from]) {
    if (visit[to] !== -1) {
      continue;
    }
    visit[to] = from;
    queue.push(to);
  }
}

answer = visit.slice(2).join("\n");

console.log(answer);

~~~
