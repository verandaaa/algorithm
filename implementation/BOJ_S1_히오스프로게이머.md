https://www.acmicpc.net/problem/16564

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map(Number);
//<------------input
let answer = 0;

arr.sort((a, b) => a - b);
arr.push(Infinity);

let index = 0;
while (index < n) {
  const a = arr[index];
  const b = arr[index + 1];
  const diff = b - a;
  if (diff > 0) {
    const want = diff * (index + 1);
    if (want <= m) {
      const c = diff;
      answer = a + c;
      m -= want;
    } //
    else {
      const c = Math.floor(m / (index + 1));
      answer = a + c;
      break;
    }
  }
  index++;
}

console.log(answer);

~~~

이분탐색으로도 가능
