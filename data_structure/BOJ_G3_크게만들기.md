# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input[1].split("").map(Number);
//<------------input
let answer = 0;

let stack = [];
let cnt = 0;
for (let i = 0; i < n; i++) {
  //스택의 맨 위가 현재 나 보다 작으면 계속 지움
  while (stack.length > 0 && arr[i] > stack[stack.length - 1] && cnt < m) {
    stack.pop();
    cnt++;
  }
  stack.push(arr[i]);
}

//계속 내림차순이라 못지운 자투리 지워줌
answer = stack.slice(0, n - m).join("");

console.log(answer);

~~~
