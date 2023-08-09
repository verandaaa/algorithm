https://www.acmicpc.net/problem/2109

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input

let answer = 0;

arr.sort((a, b) => {
  if (a[1] === b[1]) {
    return -(a[0] - b[0]);
  }
  return a[1] - b[1];
});

let queue = [];
for (let [pay, day] of arr) {
  if (queue.length < day) {
    queue.push(pay);
  } else {
    if (pay > queue[queue.length - 1]) {
      queue.pop();
      queue.push(pay);
    }
  }
  queue.sort((a, b) => b - a);
}

answer = queue.reduce((a, b) => a + b, 0);

console.log(answer);
~~~

javascript에서는 priorityQueue가 없어서 그냥 sort로 구현하였음  
직접 heap을 구현하면 속도가 훨씬 빠르다  
