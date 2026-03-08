https://www.acmicpc.net/problem/14594

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let [m] = input[1].split(" ").map(Number);
let arr = input.slice(2, 2 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

let set = new Set();
for (let [a, b] of arr) {
  //오른쪽 벽을 허물었다고 했을 때
  for (let i = a; i < b; i++) {
    set.add(i);
  }
}

//남은 벽 개수 = (전체 벽의 개수 : n-1) - (허물은 벽의 개수 : set.size)
//남은 방 개수 = 남은 벽 개수 + 1
answer = n - set.size;

console.log(answer);

~~~
