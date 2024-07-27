https://www.acmicpc.net/problem/15566

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr1 = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
let arr2 = input.slice(1 + n, 1 + n * 2).map((v) => v.split(" ").map(Number));
let arr3 = input
  .slice(1 + n * 2, 1 + n * 2 + m)
  .map((v) => v.split(" ").map(Number));
//<------------input
let answer = "NO";

arr1.unshift([]);
arr2.unshift([]);
let check = new Array(n + 1).fill(-1);
dfs(1);

function dfs(end) {
  if (end > n) {
    //통나무의 주제대로 각 연꽃에 위치한 개구리가 맞는가?
    let flag = true;

    for (let [a, b, c] of arr3) {
      if (arr1[check[a]][c - 1] !== arr1[check[b]][c - 1]) {
        flag = false;
        break;
      }
    }

    if (flag) {
      answer = "YES\n" + check.slice(1, n + 1).join(" ");
    }
    return;
  }
  //각 연꽃에 위치할 개구리의 번호를 메모한다
  for (let i = 0; i < 2; i++) {
    if (check[arr2[end][i]] === -1) {
      check[arr2[end][i]] = end;
      dfs(end + 1);
      check[arr2[end][i]] = -1;
    }
  }
}

console.log(answer);

~~~
