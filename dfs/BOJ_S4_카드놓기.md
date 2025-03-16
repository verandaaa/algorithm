https://www.acmicpc.net/problem/5568

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let [m] = input[1].split(" ").map(Number);
let arr = input.slice(2, 2 + n).map(Number);
//<------------input
let answer = "";

let set = new Set();
let res = [];
let checked = new Array(n).fill(false);
dfs(0, 0);

function dfs(end) {
  if (end === m) {
    set.add(res.join(""));
    return;
  }
  for (let i = 0; i < n; i++) {
    if (!checked[i]) {
      checked[i] = true;
      res.push(arr[i]);
      dfs(end + 1);
      checked[i] = false;
      res.pop();
    }
  }
}

answer = set.size;

console.log(answer);

~~~
