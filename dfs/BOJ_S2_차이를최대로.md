https://www.acmicpc.net/problem/10819

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = -Infinity;

let list = [];
let visit = new Array(n).fill(false);
dfs();

function dfs() {
  if (list.length === n) {
    let value = 0;
    for (let j = 0; j < n - 1; j++) {
      value += Math.abs(list[j] - list[j + 1]);
    }
    answer = Math.max(answer, value);
    return;
  }
  for (let i = 0; i < n; i++) {
    if (visit[i]) {
      continue;
    }
    visit[i] = true;
    list.push(arr[i]);
    dfs();
    visit[i] = false;
    list.pop();
  }
}

console.log(answer);

~~~
