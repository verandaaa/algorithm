https://www.acmicpc.net/problem/13422

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [t] = input[0].split(" ").map(Number);
let answer = "";
for (tc = 0; tc < t; tc++) {
  let [n, m, k] = input[1 + tc * 2].split(" ").map(Number);
  let arr = input[1 + tc * 2 + 1].split(" ").map(Number);
  //<------------input

  let count = 0;
  let sum = 0;
  for (let i = 0; i < m; i++) {
    sum += arr[i];
  }
  if (n === m) {
    //창틀을 밀 수 없다
    if (sum < k) {
      count = 1;
    }
    answer += count + "\n";
    continue;
  }
  for (let i = m; i < n + m; i++) {
    if (sum < k) {
      count++;
    }
    sum -= arr[(i - m) % n];
    sum += arr[i % n];
  }
  answer += count + "\n";
}
console.log(answer);

~~~

슬라인딩 윈도우 -> n===m 이면 창틀을 밀 수 없다는 조건을 기억하자
