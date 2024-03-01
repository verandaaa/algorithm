https://www.acmicpc.net/problem/10597

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let string = input[0];
//<------------input
let answer = "";

let n = string.length < 10 ? string.length : 9 + (string.length - 9) / 2;

string += " "; //i+1 때문에 편의상 붙임

let list = [];
let check = new Array(n + 1).fill(false);

dfs(0);

function dfs(end) {
  //모든 문자열 검사 결과
  if (end >= string.length - 1) {
    //존재하지 않는 원소가 있는지 확인
    let flag = true;
    for (let i = 1; i <= n; i++) {
      if (!check[i]) {
        flag = false;
      }
    }
    //모든 원소가 존재함을 확인
    if (flag) {
      answer = list.join(" ");
      return true;
    }
    return false;
  }
  //1자리, 2자리 수를 dfs로 보내기
  let x1 = string[end] * 1;
  let x2 = (string[end] + string[end + 1]) * 1;

  if (x1 >= 1 && x1 <= n && !check[x1]) {
    check[x1] = true;
    list.push(x1);
    if (dfs(end + 1)) {
      return true;
    }
    check[x1] = false;
    list.pop();
  }
  if (x2 >= 1 && x2 <= n && !check[x2]) {
    check[x2] = true;
    list.push(x2);
    if (dfs(end + 2)) {
      return true;
    }
    check[x2] = false;
    list.pop();
  }
  return false;
}

console.log(answer);

~~~
