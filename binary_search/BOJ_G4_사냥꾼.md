https://www.acmicpc.net/problem/8983

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m, l] = input[0].split(" ").map(Number);
let arr1 = input[1].split(" ").map(Number);
let arr2 = input.slice(2, 2 + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

arr1.sort((a, b) => a - b);

//abs(x-a)+b <= l 이 조건 -> a+b-l <= x(어떤 사대) <= a-b+l
for (let [a, b] of arr2) {
  let [min, max] = [a + b - l, a - b + l];
  let [left, right] = [0, n - 1];

  //이분탐색으로 범위에 만족하는 x를 찾는다
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (min <= arr1[mid] && arr1[mid] <= max) {
      answer++;
      break;
    } //
    else if (arr1[mid] < min) {
      left = mid + 1;
    } //
    else if (arr1[mid] > max) {
      right = mid - 1;
    }
  }
}

console.log(answer);

~~~
