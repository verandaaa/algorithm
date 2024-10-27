https://www.acmicpc.net/problem/14675

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr1 = input.slice(1, 1 + n - 1).map((v) => v.split(" ").map(Number));
let [m] = input[n].split(" ").map(Number);
let arr2 = input.slice(n + 1, n + 1 + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";

let check = new Array(n + 1).fill(0);
for (let [a, b] of arr1) {
  check[a]++;
  check[b]++;
}

for (let [t, k] of arr2) {
  if (t === 1) {
    if (check[k] === 1) {
      //끝노드인 경우 없애도 단절되지 않음
      answer += "no\n";
    } //
    else {
      //2개이상의 노드와 연결되어있을 경우 없애면 단절됨
      answer += "yes\n";
    }
  } //
  else if (t === 2) {
    //선은 어떤 선이라도 자르면 단절됨
    answer += "yes\n";
  }
}

console.log(answer);

~~~
