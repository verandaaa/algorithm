https://www.acmicpc.net/problem/16508

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let s = input[0];
let [n] = input[1].split(" ").map(Number);
let arr = input
  .slice(2, 2 + n)
  .map((v) => v.split(" "))
  .map((v) => [Number(v[0]), v[1]]);
//<------------input
let answer = Infinity;

let map = new Map();
for (let x of s) {
  map.set(x, map.get(x) + 1 || 1);
}

let list = [];
dfs(0, 0, 0);

function dfs(end, start, sum) {
  //확인
  const newMap = new Map();
  for (let item of list) {
    for (let x of item) {
      newMap.set(x, newMap.get(x) + 1 || 1);
    }
  }
  let flag = true;
  for (let key of map.keys()) {
    if (!newMap.get(key) || newMap.get(key) < map.get(key)) {
      flag = false;
      break;
    }
  }
  if (flag) {
    answer = Math.min(answer, sum);
    return;
  }

  //탐색
  for (let i = start; i < n; i++) {
    list.push(arr[i][1]);
    dfs(end + 1, i + 1, sum + arr[i][0]);
    list.pop();
  }
}

answer = answer === Infinity ? -1 : answer;

console.log(answer);

~~~
