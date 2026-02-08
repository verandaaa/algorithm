https://www.acmicpc.net/problem/1874

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map(Number);
//<------------input
let answer = "";

let i = 0;
let stack = [];
for (let x of arr) {
  if (stack[stack.length - 1] === x) {
    stack.pop();
    answer += "-" + "\n";
  } //
  else {
    if (i < x) {
      while (i < x) {
        answer += "+" + "\n";
        i++;
        stack.push(i);
      }
      stack.pop();
      answer += "-" + "\n";
    } else {
      break;
    }
  }
}

if (i !== n || stack.length > 0) {
  answer = "NO";
}

console.log(answer);

~~~
