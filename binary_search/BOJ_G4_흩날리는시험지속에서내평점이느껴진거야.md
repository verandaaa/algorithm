https://www.acmicpc.net/problem/17951

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);

//<------------input
let answer = 0;

let left = 0;
let right = arr.reduce((a, b) => a + b, 0);

while (left <= right) {
  let mid = Math.floor((left + right) / 2);

  let count = 0;
  let total = 0;
  for (let i = 0; i < n; i++) {
    total += arr[i];
    if (total >= mid) {
      count++;
      total = 0;
    }
  }
  if (count > m) {
    left = mid + 1;
  } //
  else if (count < m) {
    right = mid - 1;
  } //
  else {
    answer = mid;
    left = mid + 1;
  }
}

console.log(answer);

~~~
