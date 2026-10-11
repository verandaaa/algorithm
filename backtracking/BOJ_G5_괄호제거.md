https://www.acmicpc.net/problem/2800

# Solution 1 - JavaScript
~~~javascript
const { deflateSync } = require("zlib");
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let string = input[0];

//<------------input
let answer = [];

let info = Array.from(Array(string.length), () => -1);
let count = -1;
let stack = [];

for (let i = 0; i < string.length; i++) {
  if (string[i] === "(") {
    //괄호 열때 괄호 카운트 +1
    count++;
    stack.push(count);
    info[i] = count;
  } else if (string[i] === ")") {
    //괄호 닫을때 마지막 연괄호 찾기
    info[i] = stack.pop();
  }
}

let flag = Array.from(Array(count), () => 0);
let arr = [true, false];
let set = new Set();

dfs(0);

function dfs(end) {
  if (end === count + 1) {
    let line = "";
    for (let i = 0; i < info.length; i++) {
      if (info[i] === -1) {
        //문자
        line += string[i];
      } else if (flag[info[i]]) {
        //괄호면 표시할지 표시하지 않을지 선택
        line += string[i];
      }
    }
    set.add(line);
    return;
  }
  for (let i = 0; i < 2; i++) {
    //TT, TF, FT, FF
    flag[end] = arr[i];
    dfs(end + 1);
  }
}

answer = Array.from(set);
answer = answer.sort().slice(1, answer.length).join("\n");
//(((1)))(2) 와 같은 경우 중복된 문자열이 발생될 수 있으므로 중복제거가 필요하다.

console.log(answer);

~~~

1. 괄호의 짝을 찾아서 인덱스 매기기
2. DFS로 경우의 수를 따지기
3. flag에 따라서 문자열을 완성시키기
