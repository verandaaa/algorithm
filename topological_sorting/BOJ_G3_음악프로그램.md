https://www.acmicpc.net/problem/2623

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
//<------------input

let answer = "";

let queue = Array.from({ length: n }, (_, index) => index);
let tp = Array.from(Array(n), () => 0);
let edges = Array.from(Array(n), () => []);
for (let line of arr) {
  for (let i = 1; i < line.length - 1; i++) {
    let from = line[i] - 1;
    let to = line[i + 1] - 1;
    edges[from].push(to);
    tp[to]++;
  }
}
while (queue.length) {
  queue.sort((a, b) => tp[a] - tp[b]);
  let out = queue.shift();
  if (tp[out] !== 0) {
    answer = 0;
    break;
  }
  answer += out + 1 + "\n";
  for (let to of edges[out]) {
    tp[to]--;
  }
}

console.log(answer);

~~~
