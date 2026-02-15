https://www.acmicpc.net/problem/4097

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let arr = input.map(Number);
//<------------input
let answer = "";

let index = 0;
while (index < arr.length) {
  let n = arr[index];
  if (n === 0) {
    break;
  }

  let start = index + 1;
  let max = arr[start];
  let cur = arr[start];
  for (let i = start + 1; i < start + n; i++) {
    //현재 상태에서 더 품는 것이 이득인가? 새 출발 하는 것이 이득인가?
    if (cur + arr[i] > arr[i]) {
      cur += arr[i];
    } else {
      cur = arr[i];
    }
    max = Math.max(cur, max);
  }
  answer += max + "\n";
  index += 1 + n;
}

console.log(answer);

~~~
