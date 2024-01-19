https://www.acmicpc.net/problem/18234

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, t] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

//1순위 영양제, 2순위 처음값
arr.sort((a, b) => {
  if (a[1] === b[1]) {
    return -a[0] + b[0];
  }
  return -a[1] + b[1];
});

//w < p로 알 수 있는 사실
//1. 먹고 심고 보다는 키울만큼 키우고 먹는 것이 이득
//2. 모든 구간에서 순위가 보장됨
for (let i = 0; i < n; i++) {
  answer += arr[i][0] + arr[i][1] * (t - 1 - i);
}

console.log(answer);

~~~
