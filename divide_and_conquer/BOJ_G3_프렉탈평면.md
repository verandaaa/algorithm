https://www.acmicpc.net/problem/1030

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [s, n, k, r1, r2, c1, c2] = input[0].split(" ").map(Number);
//<------------input

let answer = "";
let nn = Math.pow(n, s);
let nk = Math.pow(n, s - 1) * k;

for (let i = r1; i <= r2; i++) {
  for (let j = c1; j <= c2; j++) {
    dfs(i, j, nn, nk);
  }
  answer += "\n";
}

console.log(answer);

function dfs(i, j, nn, nk) {
  //끝까지 쪼개졌는데 가운데가 아니다
  if (nn === 1) {
    answer += "0";
    return;
  }
  let isMiddle = checkMiddle(i, j, nn, nk);

  //가운데 안에 속하면
  if (isMiddle) {
    answer += "1";
    return;
  }

  //가운데 안에 속하지 않으면
  dfs(i % (nn / n), j % (nn / n), nn / n, nk / n);
}

function checkMiddle(i, j, nn, nk) {
  //(a,a)이상 (b,b)미만
  let a = (nn - nk) / 2;
  let b = a + nk;

  if (i >= a && i < b && j >= a && j < b) {
    return true;
  }
  return false;
}

~~~

# Pass 2 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [s, n, k, r1, r2, c1, c2] = input[0].split(" ").map(Number);
//<------------input

let answer = "";
let nn = Math.pow(n, s);
let nk = Math.pow(n, s - 1) * k;

for (let i = r1; i <= r2; i++) {
  for (let j = c1; j <= c2; j++) {
    answer += dfs(i, j, nn, nk);
  }
  answer += "\n";
}

console.log(answer);

function dfs(i, j, nn, nk) {
  //끝까지 쪼개졌는데 가운데가 아니다
  if (nn === 1) {
    return 0;
  }
  let isMiddle = checkMiddle(i, j, nn, nk);

  //가운데 안에 속하면
  if (isMiddle) {
    return 1;
  }

  //가운데 안에 속하지 않으면
  return dfs(i % (nn / n), j % (nn / n), nn / n, nk / n);
}

function checkMiddle(i, j, nn, nk) {
  //(a,a)이상 (b,b)미만
  let a = (nn - nk) / 2;
  let b = a + nk;

  if (i >= a && i < b && j >= a && j < b) {
    return true;
  }
  return false;
}

~~~


dfs에서 재귀호출을 할때 return dfs()형식으로 호출하면 최초 return값을 최종적으로 return할 수 있다   
