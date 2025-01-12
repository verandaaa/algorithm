https://www.acmicpc.net/problem/15657

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = "";

arr = arr.sort((a, b) => a - b);
let temp = [];

dfs(0, 0);

function dfs(end, start) {
  if (end === m) {
    answer += temp.join(" ") + "\n";
    return;
  }
  for (let i = start; i < n; i++) {
    temp.push(arr[i]);
    dfs(end + 1, i);
    temp.pop();
  }
}

console.log(answer);

~~~
