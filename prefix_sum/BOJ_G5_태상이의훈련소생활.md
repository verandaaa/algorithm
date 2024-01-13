https://www.acmicpc.net/problem/19951

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr1 = input[1].split(" ").map(Number);
let arr2 = input.slice(2, 2 + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = [];

let sum = new Array(n + 1).fill(0);
//구간의 시작과 끝 마킹
for (let [a, b, h] of arr2) {
  sum[a - 1] += h;
  sum[b - 1 + 1] += -h;
}
//누적합
for (let i = 1; i < n; i++) {
  sum[i] += sum[i - 1];
}
//결과를 더하기
for (let i = 0; i < n; i++) {
  answer.push(arr1[i] + sum[i]);
}

answer = answer.join(" ");

console.log(answer);

~~~
