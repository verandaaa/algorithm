https://www.acmicpc.net/problem/1477

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m, l] = input[0].split(" ").map(Number);
let arr = input.length > 1 ? input[1].split(" ").map(Number) : [];
//<------------input
let answer = 0;

arr.sort((a, b) => a - b);
arr.push(l);

let left = 1;
let right = l - 1;
while (left <= right) {
  let mid = Math.floor((left + right) / 2);

  let cur = 0;
  let index = 0;
  let count = 0;
  while (index <= n) {
    if (cur + mid < arr[index]) {
      //최소 mid간격이 되도록 휴게소 설치
      cur += mid;
      count++;
    } //
    else {
      //최소 mid간격을 만족하므로 다음 휴게소로 넘어감
      cur = arr[index];
      index++;
    }
  }

  if (count <= m) {
    //휴게소 구간을 더 좁힌다
    right = mid - 1;
    answer = mid;
  } //
  else {
    //휴게소 구간을 더 넓힌다
    left = mid + 1;
  }
}

console.log(answer);

~~~
