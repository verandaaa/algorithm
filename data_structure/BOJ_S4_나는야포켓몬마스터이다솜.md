https://www.acmicpc.net/problem/1620

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr1 = input.slice(1, 1 + n);
let arr2 = input.slice(1 + n, 1 + n + m);
//<------------input
let answer = "";

let map = new Map();
for (let i = 0; i < n; i++) {
  map.set(arr1[i], String(i + 1));
  map.set(String(i + 1), arr1[i]);
}
for (let x of arr2) {
  answer += map.get(x) + "\n";
}

console.log(answer);

~~~
