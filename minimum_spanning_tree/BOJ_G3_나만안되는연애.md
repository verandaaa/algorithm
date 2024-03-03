https://www.acmicpc.net/problem/14621

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let types = input[1].split(" ");
let edges = input.slice(2, 2 + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

types.unshift("");
edges.sort((a, b) => a[2] - b[2]);
let parents = new Array(n + 1).fill().map((_, i) => i);
let count = 0;

for (let i = 0; i < m; i++) {
  let [a, b, w] = edges[i];
  //서로 다른 성별의 대학교를 잇는 간선을 선택, 합칠 수 있는지 확인
  if (typeCheck(a, b) && Union(a, b)) {
    answer += w;
    count++;
    if (count === n - 1) {
      break;
    }
  }
}

if (count !== n - 1) {
  answer = -1;
}

function typeCheck(a, b) {
  if (types[a] === types[b]) {
    return false;
  }
  return true;
}

function Union(a, b) {
  let aRoot = findRoot(a);
  let bRoot = findRoot(b);

  if (aRoot < bRoot) {
    parents[bRoot] = aRoot;
    return true;
  } else if (aRoot > bRoot) {
    parents[aRoot] = bRoot;
    return true;
  }
  return false;
}

function findRoot(x) {
  if (x === parents[x]) {
    return x;
  }
  return findRoot(parents[x]);
}

console.log(answer);

~~~
