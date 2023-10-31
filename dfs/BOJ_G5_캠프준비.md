https://www.acmicpc.net/problem/16938

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, l, r, x] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = 0;

arr.sort((a, b) => a - b);

let size;
let temp;
for (let i = 2; i <= n; i++) {
  size = i;
  temp = [];
  dfs(0, 0, 0);
}

function dfs(end, start, sum) {
  if (end === size) {
    if (sum < l || sum > r) {
      return;
    }
    if (temp[end - 1] - temp[0] < x) {
      return;
    }
    answer++;
    return;
  }
  for (let i = start; i < n; i++) {
    temp.push(arr[i]);
    dfs(end + 1, i + 1, sum + arr[i]);
    temp.pop(arr[i]);
  }
}

console.log(answer);

~~~
