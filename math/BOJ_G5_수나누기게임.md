https://www.acmicpc.net/problem/27172

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input

let answer = Array.from(Array(n), () => 0);

let check = Array.from(Array(1000001), () => -1);
for (let i = 0; i < n; i++) {
  let x = arr[i];
  check[x] = i;
}

for (let i = 0; i < n; i++) {
  let x = arr[i];
  for (let j = 2 * x; j < 1000001; j += x) {
    if (check[j] >= 0) {
      answer[i]++;
      answer[check[j]]--;
    }
  }
}
answer = answer.join(" ");

console.log(answer);

~~~
