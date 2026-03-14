https://www.acmicpc.net/problem/13022

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let string = input[0];
//<------------input
let answer = 1;

let word = ["w", "o", "l", "f"];
let i = 0;
loop: while (i < string.length) {
  //'w'로 시작하지 않으면 시작도 안한다
  if (string[i] !== word[0]) {
    answer = 0;
    break loop;
  }
  //'w' 개수 세기
  let count = 0;
  while (string[i] === word[0]) {
    i++;
    count++;
  }
  //'w' 개수 만큼 'o' 'l' 'f' 도 반복되는지 확인
  let flag = true;
  for (let j = 1; j < 4; j++) {
    for (let k = 0; k < count; k++) {
      if (string[i] !== word[j]) {
        flag = false;
        answer = 0;
        break loop;
      }
      i++;
    }
  }
}

console.log(answer);

~~~
