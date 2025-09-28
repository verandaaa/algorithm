https://www.acmicpc.net/problem/20168

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m, s, e, k] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = Infinity;

let nodes = new Array(n + 1).fill().map(() => []);
for (let [from, to, weight] of arr) {
  nodes[from].push([to, weight]);
  nodes[to].push([from, weight]);
}

let visit = new Array(n + 1).fill(false);
visit[s] = true;
let list = [];

dfs(s);

function dfs(cur) {
  if (cur === e) {
    let sum = list.reduce((acc, cur) => acc + cur, 0);
    if (sum <= k) {
      answer = Math.min(answer, Math.max(...list));
    }
    return;
  }
  for (let [to, weight] of nodes[cur]) {
    if (visit[to]) {
      continue;
    }
    visit[to] = true;
    list.push(weight);
    dfs(to);
    visit[to] = false;
    list.pop();
  }
}

answer = answer === Infinity ? -1 : answer;

console.log(answer);

~~~
