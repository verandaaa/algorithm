https://www.acmicpc.net/problem/2285

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

//마을 위치 오름차순 정렬
arr.sort((a, b) => a[0] - b[0]);
let totalCount = 0; //인구수 총합
for (let i = 0; i < n; i++) {
  totalCount += arr[i][1];
}

//인구수의 중앙을 포함하는 시점이 거리를 가장 좁히는 곳
let mid = Math.ceil(totalCount / 2);
let count = 0;
for (let i = 0; i < n; i++) {
  count += arr[i][1];
  if (count >= mid) {
    answer = arr[i][0];
    break;
  }
}

console.log(answer);

~~~
