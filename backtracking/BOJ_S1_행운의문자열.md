https://www.acmicpc.net/problem/1342

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let string = input[0];
//<------------input

let answer = 0;
let alphabet = Array.from(Array(26), () => 0);

for (let i = 0; i < string.length; i++) {
  let index = string.charCodeAt(i) - 97;
  alphabet[index]++;
}

let arr = [];
dfs(0);

console.log(answer);

function dfs(end) {
  if (end === string.length) {
    answer++;
  }
  for (let i = 0; i < 26; i++) {
    if (alphabet[i] > 0) {
      if (end === 0 || arr[end - 1] !== i) {
        alphabet[i]--;
        arr.push(i);
        dfs(end + 1);
        alphabet[i]++;
        arr.pop();
      }
    }
  }
}

~~~
