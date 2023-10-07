https://www.acmicpc.net/problem/5549

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let [o] = input[1].split(" ").map(Number);
let map = input.slice(2, 2 + n).map((v) => v.split(""));
let infos = input.slice(2 + n, 2 + n + o).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";

//지역 정보 마킹
let newMap = Array.from(Array(n + 1), () => Array(m + 1));
for (let i = 0; i < n + 1; i++) {
  newMap[i][0] = [0, 0, 0];
}
for (let j = 0; j < m + 1; j++) {
  newMap[0][j] = [0, 0, 0];
}
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    let zone = [0, 0, 0];
    if (map[i][j] === "J") {
      zone[0]++;
    } else if (map[i][j] === "O") {
      zone[1]++;
    } else if (map[i][j] === "I") {
      zone[2]++;
    }
    newMap[i + 1][j + 1] = zone;
  }
}

//누적합 매기기
for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < m + 1; j++) {
    let zone = [];
    for (let k = 0; k < 3; k++) {
      zone.push(
        newMap[i][j][k] +
          newMap[i - 1][j][k] +
          newMap[i][j - 1][k] -
          newMap[i - 1][j - 1][k]
      );
    }
    newMap[i][j] = zone;
  }
}

//구역별 계산
for (let [a, b, c, d] of infos) {
  let zone = [];
  for (let k = 0; k < 3; k++) {
    zone.push(
      newMap[c][d][k] -
        newMap[c][b - 1][k] -
        newMap[a - 1][d][k] +
        newMap[a - 1][b - 1][k]
    );
  }
  answer += zone.join(" ") + "\n";
}

console.log(answer);

~~~
