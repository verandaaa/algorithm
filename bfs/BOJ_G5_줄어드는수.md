https://www.acmicpc.net/problem/1174

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
//<------------input
let answer = -1;

let memo = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let queue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let count = 10;
let c = 1;
while (memo[memo.length - 1] !== 9876543210) {
  let newQueue = [];
  for (let i = 1; i < 10; i++) {
    for (let x of queue) {
      if (i > Math.floor(x / c)) {
        let nx = c * 10 * i + x;
        memo.push(nx);
        newQueue.push(nx);
        count++;
      } //
      else {
        break;
      }
    }
  }
  queue = newQueue;
  c *= 10;
}

if (memo[n] !== undefined) {
  answer = memo[n];
}

console.log(answer);

~~~

감소하는 수 와 동일
