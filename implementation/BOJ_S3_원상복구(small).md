https://www.acmicpc.net/problem/22858

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, k] = input[0].split(" ").map(Number);
let s = input[1].split(" ").map(Number);
let d = input[2].split(" ").map(Number);
//<------------input
let answer = "";

let arr = [...s];

for (let i = 0; i < k; i++) {
  let narr = new Array(n).fill(0);
  for (let j = 0; j < n; j++) {
    narr[d[j] - 1] = arr[j];
  }
  arr = [...narr];
}

answer = arr.join(" ");

console.log(answer);

~~~
