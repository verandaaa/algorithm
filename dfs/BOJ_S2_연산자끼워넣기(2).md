https://www.acmicpc.net/problem/15658

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr1 = input[1].split(" ").map(Number);
let arr2 = input[2].split(" ").map(Number);
//<------------input
let answer = "";

let max = -Infinity;
let min = Infinity;
let cur = [];

dfs(0);

function dfs(end) {
  if (end === n - 1) {
    let res = arr1[0];
    for (let i = 1; i < n; i++) {
      let x = cur[i - 1];
      let right = arr1[i];
      if (x === 0) {
        res += right;
      } else if (x === 1) {
        res -= right;
      } else if (x === 2) {
        res *= right;
      } else if (x === 3) {
        if (res < 0) {
          res = Math.floor(Math.abs(res) / right) * -1;
        } else {
          res = Math.floor(res / right);
        }
      }
    }
    max = Math.max(max, res);
    min = Math.min(min, res);
    return;
  }
  for (let i = 0; i < 4; i++) {
    if (arr2[i] > 0) {
      arr2[i]--;
      cur.push(i);
      dfs(end + 1);
      arr2[i]++;
      cur.pop();
    }
  }
}

answer = max + "\n" + min;

console.log(answer);

~~~
