https://www.acmicpc.net/problem/15654

# Solution 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n, m] = input[0].split(" ").map((v) => v * 1);
let arr = input[1]
  .split(" ")
  .map((v) => v * 1)
  .sort((a, b) => a - b);

//<------------input
let answer = "";
let visited = Array.from(Array(n), () => false);

dfs([]);

function dfs(sq) {
  if (sq.length === m) {
    answer += sq.join(" ") + "\n";
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    if (visited[i]) continue;
    sq.push(arr[i]);
    visited[i] = true;
    dfs(sq);
    sq.pop();
    visited[i] = false;
  }
}

console.log(answer);

~~~

array를 한번에 출력하고 싶을 때 join을 사용하면 된다
