https://www.acmicpc.net/problem/5014

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [f, s, g, u, d] = input[0].split(" ").map(Number);
//<------------input
let answer = 0;

let memo = Array.from(Array(f + 1), () => Infinity);
memo[s] = 0;
let queue = [s];
while (queue.length) {
  let cur = queue.shift();

  let up = cur + u;
  let down = cur - d;

  if (up <= f && memo[cur] + 1 < memo[up]) {
    memo[up] = memo[cur] + 1;
    queue.push(up);
  }
  if (down >= 1 && memo[cur] + 1 < memo[down]) {
    memo[down] = memo[cur] + 1;
    queue.push(down);
  }
}
answer = memo[g] === Infinity ? "use the stairs" : memo[g];

console.log(answer);

~~~
