https://www.acmicpc.net/problem/1283

# Pass 1 - JavaScript

~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n);
//<------------input
let answer = "";

let set = new Set();

for (let string of arr) {
  let words = string.split(" ");

  //먼저 하나의 옵션에 대해 왼쪽에서부터 오른쪽 순서로 단어의 첫 글자가 이미 단축키로 지정되었는지 살펴본다.
  //만약 단축키로 아직 지정이 안 되어있다면 그 알파벳을 단축키로 지정한다.
  let x = null;
  let index = 0;
  for (let word of words) {
    if (!set.has(word[0])) {
      x = word[0];
      break;
    }
    index += word.length + 1;
  }

  //만약 모든 단어의 첫 글자가 이미 지정이 되어있다면 왼쪽에서부터 차례대로 알파벳을 보면서 단축키로 지정 안 된 것이 있다면 단축키로 지정한다.
  if (x === null) {
    for (let i = 0; i < string.length; i++) {
      let ch = string[i];

      if (ch === " ") {
        continue;
      }
      if (!set.has(ch)) {
        x = ch;
        index = i;
        break;
      }
    }
  }

  //명령어를 추가하고 옵션에서 명령어를 강조하여 출력한다
  let option = string;
  if (x !== null) {
    set.add(x.toUpperCase());
    set.add(x.toLowerCase());
    option = string.substring(0, index) + "[" + string[index] + "]" + string.substring(index + 1, string.length);
  }
  answer += option + "\n";
}

console.log(answer);
~~~
