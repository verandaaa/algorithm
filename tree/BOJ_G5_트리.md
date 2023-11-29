https://www.acmicpc.net/problem/1068

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
let [k] = input[2].split(" ").map(Number);

//<------------input
let answer = 0;

let root;

//그래프 연결
let edges = new Array(n).fill().map(() => []);
for (let i = 0; i < n; i++) {
  if (arr[i] >= 0) {
    edges[arr[i]].push(i);
  } //
  else if (arr[i] === -1) {
    root = i;
  }
}

//루트 삭제시 그냥 0임
if (root === k) {
  console.log(0);
  return;
}

//탐색하면서 자식이 없는 노드 체크
let queue = [root];
while (queue.length) {
  let from = queue.shift();

  let count = 0;
  for (let to of edges[from]) {
    if (to === k) {
      continue;
    }
    count++;
    queue.push(to);
  }
  if (count === 0) {
    answer++;
  }
}

console.log(answer);

~~~
