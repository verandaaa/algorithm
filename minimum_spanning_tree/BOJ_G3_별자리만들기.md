https://www.acmicpc.net/problem/4386

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input

let answer = 0;

class Edge {
  constructor(from, to, weight) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}

let edges = [];
for (let i = 0; i < n - 1; i++) {
  for (let j = i + 1; j < n; j++) {
    let weight = Math.sqrt(
      Math.pow(arr[i][0] - arr[j][0], 2) + Math.pow(arr[i][1] - arr[j][1], 2)
    );
    edges.push(new Edge(i, j, weight));
  }
}
edges.sort((a, b) => a.weight - b.weight);

let parents = Array.from(Array(n), (_, i) => i);
let count = 1;

for (let edge of edges) {
  if (union(edge.from, edge.to)) {
    count++;
    answer += edge.weight;
    if (count === n) {
      break;
    }
  }
}
answer = answer.toFixed(2);

console.log(answer);

function union(a, b) {
  let aRoot = find(a);
  let bRoot = find(b);

  if (aRoot > bRoot) {
    parents[aRoot] = bRoot;
    return true;
  } else if (aRoot < bRoot) {
    parents[bRoot] = aRoot;
    return true;
  } else {
    return false;
  }
}

function find(x) {
  if (parents[x] === x) {
    return x;
  }
  return find(parents[x]);
}

~~~
