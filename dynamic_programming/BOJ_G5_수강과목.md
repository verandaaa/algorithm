https://www.acmicpc.net/problem/17845

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [m, n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

let prev = Array.from(Array(m + 1), () => 0);
for (let [i, t] of arr) {
  let cur = [0]; //prev=cur 부분 때문에 for안에서 초기화
  for (let j = 1; j <= m; j++) {
    if (j < t) {
      cur.push(prev[j]);
    } //
    else {
      cur.push(Math.max(prev[j], prev[j - t] + i));
    }
  }
  prev = cur;
}
answer = prev[m];

console.log(answer);

~~~

1차원 배열을 사용하면서, 가장 빠르고 메모리를 적게 사용하는 방법
