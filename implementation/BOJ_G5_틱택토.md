https://www.acmicpc.net/problem/7682

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let arr = input.slice(0, input.length - 1);
//<------------input
let answer = "";

arr = arr.map((line) => [line.substring(0, 3), line.substring(3, 6), line.substring(6, 9)]);

for (let map of arr) {
  let string = "invalid";
  let [xCount, oCount] = getCount(map);
  let [xResult, oResult] = [isWin(map, "XXX"), isWin(map, "OOO")];

  //X승이다
  if (xResult && !oResult) {
    //x가 두는 횟수가 o보다 큼
    if (xCount - 1 === oCount) {
      string = "valid";
    }
  }
  //O승이다
  else if (!xResult && oResult) {
    //x가 o가 두는 횟수가 같음
    if (xCount === oCount) {
      string = "valid";
    }
  }
  //승부가 안났다
  else if (!xResult && !oResult) {
    //x는 5고 o는 4여야 함
    if (xCount === 5 && oCount === 4) {
      string = "valid";
    }
  }
  answer += string + "\n";
}

function getCount(map) {
  //3x3에서 x와 o가 각각 몇개인지 셈
  let [xCount, oCount] = [0, 0];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (map[i][j] === "X") {
        xCount++;
      } //
      else if (map[i][j] === "O") {
        oCount++;
      }
    }
  }

  return [xCount, oCount];
}

function isWin(map, what) {
  //가로 3개
  if (map[0][0] + map[0][1] + map[0][2] === what) {
    return true;
  }
  if (map[1][0] + map[1][1] + map[1][2] === what) {
    return true;
  }
  if (map[2][0] + map[2][1] + map[2][2] === what) {
    return true;
  }

  //세로 3개
  if (map[0][0] + map[1][0] + map[2][0] === what) {
    return true;
  }
  if (map[0][1] + map[1][1] + map[2][1] === what) {
    return true;
  }
  if (map[0][2] + map[1][2] + map[2][2] === what) {
    return true;
  }

  //대각선 2개
  if (map[0][0] + map[1][1] + map[2][2] === what) {
    return true;
  }
  if (map[2][0] + map[1][1] + map[0][2] === what) {
    return true;
  }

  //빙고 만족 X
  return false;
}

console.log(answer);

/*
XXX
OOO
X..
이 경우 X가 먼저 승리하고 x-1=o이라고 valid가 아님
*/

~~~
