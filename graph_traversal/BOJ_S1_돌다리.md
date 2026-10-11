https://www.acmicpc.net/problem/12761

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [a, b, n, m] = input[0].split(" ").map(Number);
//<------------input
let answer = 0;

let dp = new Array(100001).fill(Infinity);
dp[n] = 0;
let queue = [n];

while (queue.length) {
  let x = queue.shift();

  //+1 -1
  for (let d of [-1, 1]) {
    let nx = x + d;
    if (nx < 0 || nx > 100000) {
      break;
    }
    if (dp[x] + 1 < dp[nx]) {
      dp[nx] = dp[x] + 1;
      queue.push(nx);
    }
  }
  //+a -a +b -b
  for (let d of [-1, 1]) {
    for (let c of [a, b]) {
      let nx = x + d * c;
      if (nx < 0 || nx > 100000) {
        break;
      }
      if (dp[x] + 1 < dp[nx]) {
        dp[nx] = dp[x] + 1;
        queue.push(nx);
      }
    }
  }
  //*a *b
  for (let c of [a, b]) {
    let nx = x * c;
    if (nx < 0 || nx > 100000) {
      break;
    }
    if (dp[x] + 1 < dp[nx]) {
      dp[nx] = dp[x] + 1;
      queue.push(nx);
    }
  }

  if (dp[m] !== Infinity) {
    answer = dp[m];
    break;
  }
}

console.log(answer);

~~~
