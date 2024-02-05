https://www.acmicpc.net/problem/2580

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let map = input.slice(0, 9).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";

let list = [];

for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    if (map[i][j] === 0) {
      list.push([i, j]);
    }
  }
}

dfs(0);

function dfs(end) {
  if (end === list.length) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        answer += map[i][j] + " ";
      }
      answer += "\n";
    }
    return true;
  }
  let [x, y] = list[end];

  for (let k = 1; k <= 9; k++) {
    //k가 이 좌표에 들어가기 적당한 값이라면?
    if (check(x, y, k)) {
      map[x][y] = k;
      if (dfs(end + 1)) {
        return true;
      }
      //map의 값은 반복문으로 변하므로 다시 원상복구 해주어야 함
      map[x][y] = 0;
    }
  }
  return false;
}

function check(x, y, k) {
  //가로검사
  for (let j = 0; j < 9; j++) {
    if (map[x][j] === k) {
      return false;
    }
  }

  //세로검사
  for (let i = 0; i < 9; i++) {
    if (map[i][y] === k) {
      return false;
    }
  }

  //주위검사
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (map[i + x - (x % 3)][j + y - (y % 3)] === k) {
        return false;
      }
    }
  }
  return true;
}

console.log(answer);

~~~
