https://www.acmicpc.net/problem/2467

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input

let answer = "";
let min = Infinity;

let left = 0;
let right = n - 1;
while (left < right) {
  let sum = arr[left] + arr[right];
  let absSum = Math.abs(sum);
  if (sum > 0) {
    if (absSum < min) {
      min = absSum;
      answer = arr[left] + " " + arr[right];
    }
    right--;
  } else if (sum < 0) {
    if (absSum < min) {
      min = absSum;
      answer = arr[left] + " " + arr[right];
    }
    left++;
  } else {
    answer = arr[left] + " " + arr[right];
    break;
  }
}

console.log(answer);

~~~
