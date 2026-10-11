https://www.acmicpc.net/problem/18513

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = 0;

let set = new Set();
let queue = [];
for (let x of arr) {
  queue.push([x, x]);
  set.add(x);
}

loop: while (queue.length) {
  let newQueue = [];

  for (let [x, p] of queue) {
    //좌표 기준으로 좌,우 확인
    for (let t = -1; t <= 1; t += 2) {
      let nx = x + t;
      if (!set.has(nx)) {
        newQueue.push([nx, p]);
        set.add(nx);
        answer += Math.abs(nx - p);
      }
      if (set.size === m + n) {
        break loop;
      }
    }
  }
  queue = newQueue;
}

console.log(answer);

~~~
