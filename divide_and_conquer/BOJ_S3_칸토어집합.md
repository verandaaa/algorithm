https://www.acmicpc.net/problem/4779

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let arr = input.map((v) => Number(v));
//<------------input
let answer = "";

let list = ["-"];
for (let i = 1; i <= 12; i++) {
  list[i] = list[i - 1] + " ".repeat(Math.pow(3, i - 1)) + list[i - 1];
}

for (let x of arr) {
  answer += list[x] + "\n";
}

console.log(answer);

~~~
