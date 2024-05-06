https://www.acmicpc.net/problem/1756

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let oven = input[1].split(" ").map(Number);
let pizza = input[2].split(" ").map(Number);
//<------------input
let answer = 0;

//각 층에 통과되는 최대 피자 크기 구하기
let newOven = new Array(n).fill(0);
let min = Infinity;
for (let i = 0; i < n; i++) {
  if (oven[i] < min) {
    min = oven[i];
  }
  newOven[i] = min;
}

//맨 아래부터 넣을 수 있는 공간에 넣기
let p = 0;
for (let i = n - 1; i >= 0; i--) {
  if (newOven[i] >= pizza[p]) {
    p++;
    if (p === m) {
      answer = i + 1;
      break;
    }
  }
}

console.log(answer);

~~~
