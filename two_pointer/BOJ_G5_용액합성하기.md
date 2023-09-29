https://www.acmicpc.net/problem/14921

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = Infinity;

let left = 0,
  right = n - 1;
while (left < right) {
  let sum = arr[left] + arr[right];
  if (Math.abs(sum) < Math.abs(answer)) {
    answer = sum;
  }
  if (sum > 0) {
    right--;
  } //
  else if (sum < 0) {
    left++;
  } //
  else {
    break;
  }
}

console.log(answer);

~~~
