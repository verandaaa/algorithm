https://www.acmicpc.net/problem/9421

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
//<------------input
let answer = "";

let max = 1000001;
let arr = new Array(max).fill(false);
arr[0] = true;
arr[1] = true;

let res = [];

for (let i = 2; i < max; i++) {
  if (arr[i]) {
    continue;
  } else {
    res.push(i);
  }
  for (let j = i * 2; j < max; j += i) {
    arr[j] = true;
  }
}

let start;
let flag;
let map;
for (let x of res) {
  start = undefined;
  flag = 0;
  map = new Map();
  if (x <= n) {
    check(x);
    if (flag === 2) {
      console.log(x);
    }
  }
}

function check(x) {
  map.set(x, map.get(x) + 1 || 1);

  if (map.get(x) === 2) {
    flag = 1;
    return;
  }
  if (x === 1) {
    flag = 2;
    return;
  }

  let s = String(x);
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    res += Number(s[i] ** 2);
  }

  check(res);
}

console.log(answer);

~~~
