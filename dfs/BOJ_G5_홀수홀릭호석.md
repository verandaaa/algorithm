https://www.acmicpc.net/problem/20164

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let string = input[0];
//<------------input
let answer = "";

let [max, min] = [0, Infinity];
dfs(string, 0);

function dfs(string, total) {
  //홀수 개수 세기
  let count = getOddCount(string);

  //길이가 1이면 종료한다
  if (string.length === 1) {
    max = Math.max(max, total + count);
    min = Math.min(min, total + count);
    return;
  }
  //길이가 2라면 2갈래로 찢는다
  else if (string.length === 2) {
    let s1 = string[0] * 1;
    let s2 = string[1] * 1;
    let nString = s1 + s2 + "";
    dfs(nString, total + count);
  }
  //길이가 3이상이면 3갈래로 찢는다
  else {
    //1번째 시작점은 0 고정
    for (let j = 1; j < string.length - 1; j++) { //2번째 시작점
      for (let k = j + 1; k < string.length; k++) { //3번째 시작점
        let s1 = string.substring(0, j) * 1;
        let s2 = string.substring(j, k) * 1;
        let s3 = string.substring(k, string.length) * 1;
        let nString = s1 + s2 + s3 + "";
        dfs(nString, total + count);
      }
    }
  }
}

function getOddCount(string) {
  let count = 0;
  for (let x of string) {
    if ((x * 1) % 2 === 1) {
      count++;
    }
  }
  return count;
}

answer += min + " " + max;

console.log(answer);

~~~
