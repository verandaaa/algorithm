https://www.acmicpc.net/problem/6068

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
let answer = -1;

arr.sort((a, b) => -(a[1] - b[1]));
let cur = arr[0][1]; //제일 마지막 시간부터
let flag = true;
for (let [t, s] of arr) {
  if (cur > s) {
    cur = s;
  }
  cur -= t;
  if (cur < 0) {
    flag = false;
    break;
  }
}

if (flag) {
  answer = cur;
}

console.log(answer);

~~~
