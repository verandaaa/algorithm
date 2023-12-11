https://www.acmicpc.net/problem/11509

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = n;

let check = new Array(1000001).fill(0);
for (let x of arr) {
  if (check[x + 1] > 0) {
    answer--;
    check[x + 1]--;
  }
  check[x]++;
}

console.log(answer);

~~~
