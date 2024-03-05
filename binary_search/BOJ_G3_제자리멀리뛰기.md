https://www.acmicpc.net/problem/6209

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [d, n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map(Number);
//<------------input
let answer = 0;

arr.unshift(0);
arr.push(d);
arr.sort((a, b) => a - b);
arr = arr.map((_, i) => (i <= n ? arr[i + 1] - arr[i] : -1));

let left = 1;
let right = Math.floor(d / (n - m + 1));
while (left <= right) {
  //기준이 되는 점프 최소거리의 최대값 찾기
  let mid = Math.floor((left + right) / 2);

  let count = 0;
  let cur = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    if ((cur + arr[i] >= mid)) {
      count++;
      cur = 0;
    } else {
      cur += arr[i];
    }
  }

  if (count >= n - m + 1) {
    left = mid + 1;
    answer = Math.max(answer, mid);
  } //
  else {
    right = mid - 1;
  }
}

console.log(answer);

~~~
