https://www.acmicpc.net/problem/17128

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let Q = input[1].split(" ").map(Number);
let N = input[2].split(" ").map(Number);
//let arr = input.slice(1, input.length).map((v) => v.split(" ").map(Number));

//<------------input
let answer = "";
let qs = [];
let sum = 0;

for (let i = 0; i < n; i++) {
  let q = 1;
  for (let j = 0; j < 4; j++) {
    q *= Q[(i + j) % n];
  }
  qs.push(q);
  sum += q;
}

for (let i = 0; i < m; i++) {
  let index = N[i] - 1;
  for (let j = 0; j < 4; j++) {
    qs[(index - j + n) % n] *= -1;
    sum += 2 * qs[(index - j + n) % n];
  }
  answer += sum + "\n";
}

console.log(answer);

~~~
