https://www.acmicpc.net/problem/1806

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);

//<------------input

let answer = Infinity;
let sum = 0;
let left = 0;
for (let right = 0; right < n; right++) {
  sum += arr[right];
  while (sum >= m) {
    answer = Math.min(answer, right - left + 1);
    sum -= arr[left++];
  }
}

if (answer === Infinity) answer = 0;

console.log(answer);

~~~
