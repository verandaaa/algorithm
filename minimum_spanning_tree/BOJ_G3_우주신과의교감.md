https://www.acmicpc.net/problem/1774

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr1 = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
let arr2 = input.slice(1 + n, 1 + n + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

//간선 만들기
let edges = [];
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    let dis = (arr1[i][0] - arr1[j][0]) ** 2 + (arr1[i][1] - arr1[j][1]) ** 2;
    edges.push([i + 1, j + 1, dis]);
  }
}
edges.sort((a, b) => a[2] - b[2]);

//부모루트, 현재 간선 개수
let parents = new Array(n + 1).fill().map((_, i) => i);
let count = 0;

//이미 연결된 통로
for (let [a, b] of arr2) {
  if (union(a, b)) {
    count++;
  }
}

//남은 통로 연결
for (let [a, b, c] of edges) {
  if (union(a, b)) {
    answer += Math.sqrt(c);
    count++;
    if (count === n - 1) {
      break;
    }
  }
}

function union(a, b) {
  let aRoot = findRoot(a);
  let bRoot = findRoot(b);

  if (aRoot < bRoot) {
    parents[bRoot] = aRoot;
    return true;
  } //
  else if (aRoot > bRoot) {
    parents[aRoot] = bRoot;
    return true;
  }
  return false;
}

function findRoot(x) {
  if (parents[x] === x) {
    return x;
  }
  return findRoot(parents[x]);
}

answer = answer.toFixed(2);

console.log(answer);

~~~
