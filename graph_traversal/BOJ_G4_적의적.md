https://www.acmicpc.net/problem/12893

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 1;

let edges = new Array(n + 1).fill().map(() => []);
for (let [a, b] of arr) {
  edges[a].push(b);
  edges[b].push(a);
}

let nodes = new Array(n + 1).fill(null);
loop: for (let i = 1; i < n + 1; i++) {
  if (nodes[i] !== null) {
    continue;
  }
  nodes[i] = "R";
  let queue = [[i, "R"]]; //노드번호, 이전컬러
  while (queue.length) {
    let [from, prevColor] = queue.shift();
    let newColor = prevColor === "R" ? "B" : "R";

    for (let to of edges[from]) {
      if (nodes[to] === null) {
        nodes[to] = newColor;
        queue.push([to, newColor]);
      } //
      else if (nodes[to] === prevColor) {
        answer = 0;
        break loop;
      }
    }
  }
}

console.log(answer);

~~~

# Pass 2 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 1;

let parents = new Array(n + 1).fill().map((_, i) => i);
let enemys = new Array(n + 1).fill(null);

for (let [a, b] of arr) {
  let aRoot = findRoot(a);
  let bRoot = findRoot(b);

  if (aRoot === bRoot) {
    answer = 0;
    break;
  }

  let aEnemy = enemys[a];
  let bEnemy = enemys[b];

  if (aEnemy) {
    Union(aEnemy, b);
  } //
  else {
    enemys[a] = b;
  }

  if (bEnemy) {
    Union(bEnemy, a);
  } //
  else {
    enemys[b] = a;
  }
}

function findRoot(x) {
  if (parents[x] === x) {
    return x;
  }
  return findRoot(parents[x]);
}

function Union(a, b) {
  let aRoot = findRoot(a);
  let bRoot = findRoot(b);

  if (aRoot < bRoot) {
    parents[bRoot] = aRoot;
  } else {
    parents[aRoot] = bRoot;
  }
}

console.log(answer);

~~~

1. 그래프 탐색 - 빨강, 파랑으로 체크하면서 같은색 끼리 붙지 않도록 체크 하는 방법 
2. 유니온파인드 - a,b의 부모가 일치하면 성립불가(종료). a,b의 각각의 적을 찾아 있다면 유니온파인드로 합친다  
