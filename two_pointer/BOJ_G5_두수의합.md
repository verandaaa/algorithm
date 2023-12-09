https://www.acmicpc.net/problem/9024

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [t] = input[0].split(" ").map(Number);

//<------------input
let answer = "";

for (let tc = 0; tc < t; tc++) {
  let [n, m] = input[1 + tc * 2].split(" ").map(Number);
  let arr = input[2 + tc * 2].split(" ").map(Number);
  let count = 0;

  arr.sort((a, b) => a - b);
  let left = 0;
  let right = n - 1;
  let minChai = Infinity;

  while (left < right) {
    let sum = arr[left] + arr[right];
    let chai = Math.abs(sum - m);

    if (sum < m) {
      left++;
    } //
    else if (sum > m) {
      right--;
    } //
    else {
      left++;
      right--;
    }

    if (chai < minChai) {
      minChai = chai;
      count = 1;
    } //
    else if (chai === minChai) {
      count++;
    }
  }
  answer += count + "\n";
}

console.log(answer);

~~~
