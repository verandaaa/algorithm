https://www.acmicpc.net/problem/17352

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n - 2).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";

let set = new Set();
let parents = new Array(n + 1).fill().map((_, i) => i);

//주어진 간선을 연결시키면서 부모를 메모
for (let [a, b] of arr) {
  Union(a, b);
}

//집합이 다른(루트가 다른) 두 노드를 찾기
for (let i = 1; i <= n; i++) {
  let p = findRoot(i);
  if (!set.has(p)) {
    set.add(i);
    if (set.size === 2) {
      answer = Array.from(set).join(" ");
      break;
    }
  }
}

function Union(a, b) {
  let aRoot = findRoot(a);
  let bRoot = findRoot(b);

  if (aRoot < bRoot) {
    parents[bRoot] = aRoot;
  } else if (aRoot > bRoot) {
    parents[aRoot] = bRoot;
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
