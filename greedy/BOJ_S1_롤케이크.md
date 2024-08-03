https://www.acmicpc.net/problem/16206

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = 0;

arr.sort((a, b) => a - b);
let a = []; //10의 배수 : 끝까지 자르면 +1개 공짜
let b = []; //일반 수
for (let x of arr) {
  if (x % 10 === 0) {
    a.push(x);
  } else {
    b.push(x);
  }
}
arr = [...a, ...b];

f("a", a);
f("b", b);

function f(type, array) {
  for (let x of array) {
    let count = Math.floor(x / 10);
    let free = type === "a" ? 1 : 0;

    if (m >= count - free) {
      answer += count;
      m = m - (count - free);
    } //
    else {
      answer += m;
      m = 0;
      break;
    }
  }
}

console.log(answer);

~~~
