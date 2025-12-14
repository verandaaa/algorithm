https://www.acmicpc.net/problem/17829

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

answer = dfs(n, 0, 0);

function dfs(size, s, e) {
  if (size === 1) {
    return arr[s][e];
  }
  let newSize = size / 2;

  let a = dfs(newSize, s, e);
  let b = dfs(newSize, s + newSize, e);
  let c = dfs(newSize, s, e + newSize);
  let d = dfs(newSize, s + newSize, e + newSize);

  //두번째로 큰 수 추출
  const list = [a, b, c, d].sort((a, b) => b - a);
  return list[1];
}

console.log(answer);

~~~
