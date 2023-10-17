https://www.acmicpc.net/problem/3020

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map(Number);
//<------------input
let answer = [Infinity, 0];

let count1 = Array.from(Array(m + 1), () => 0);
let count2 = Array.from(Array(m + 1), () => 0);

//길이의 개수 세기
for (let i = 0; i < n; i++) {
  if (i % 2 === 0) {
    count1[arr[i]]++;
  } //
  else {
    count2[arr[i]]++;
  }
}
//누적합 구하기
for (let i = m - 1; i >= 1; i--) {
  count1[i] += count1[i + 1];
}
//위에 달린거는 반전시키기
for (let i = m - 1; i >= 1; i--) {
  count2[i] += count2[i + 1];
}
count2.shift();
count2.reverse();
count2.unshift(0);

//최소값 구하기
for (let i = 1; i <= m; i++) {
  let count = count1[i] + count2[i];
  if (count < answer[0]) {
    answer[0] = count;
    answer[1] = 1;
  } //
  else if (count === answer[0]) {
    answer[1]++;
  }
}
answer = answer.join(" ");

console.log(answer);

~~~
