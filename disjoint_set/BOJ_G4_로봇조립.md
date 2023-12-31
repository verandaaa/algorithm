https://www.acmicpc.net/problem/18116

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map((v) => (!isNaN(v) ? Number(v) : v)));
//<------------input
let answer = "";

let parents = new Array(1000001).fill().map((_, i) => i);
let sums = new Array(1000001).fill().map(() => 1);

for (let line of arr) {
  let opt, a, b, c;
  if (line.length === 3) {
    [opt, a, b] = line;
  } //
  else {
    [opt, c] = line;
  }

  if (opt === "I") {
    union(a, b);
  } //
  else if (opt === "Q") {
    answer += sums[findRoot(c)] + "\n";
  }
}

function union(a, b) {
  let aRoot = findRoot(a);
  let bRoot = findRoot(b);

  if (aRoot > bRoot) {
    parents[aRoot] = bRoot;
    sums[bRoot] += sums[aRoot];
  } //
  else if (aRoot < bRoot) {
    parents[bRoot] = aRoot;
    sums[aRoot] += sums[bRoot];
  }
}

function findRoot(x) {
  if (x === parents[x]) {
    return x;
  }
  return findRoot(parents[x]);
}

console.log(answer);

~~~
