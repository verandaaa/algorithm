https://www.acmicpc.net/problem/14500

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let map = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

let dx = [
  [0, 0, 0, 0],
  [0, 1, 2, 3],
  [0, 0, 1, 1],
  [0, 1, 2, 2],
  [0, 0, 0, 1],
  [0, 0, 1, 2],
  [0, 1, 1, 1],
  [0, 1, 1, 2],
  [0, 0, 1, 1],
  [0, 0, 0, 1],
  [0, 1, 1, 2],
  [0, 1, 1, 1],
  [0, 1, 1, 2],
  [0, 1, 2, 2],
  [0, 1, 1, 1],
  [0, 0, 1, 2],
  [0, 0, 0, 1],
  [0, 1, 1, 2],
  [0, 0, 1, 1],
];
let dy = [
  [0, 1, 2, 3],
  [0, 0, 0, 0],
  [0, 1, 0, 1],
  [0, 0, 0, 1],
  [0, 1, 2, 0],
  [0, 1, 1, 1],
  [0, -2, -1, 0],
  [0, 0, 1, 1],
  [0, 1, -1, 0],
  [0, 1, 2, 1],
  [0, -1, 0, 0],
  [0, -1, 0, 1],
  [0, 0, 1, 0],
  [0, 0, -1, 0],
  [0, 0, 1, 2],
  [0, 1, 0, 0],
  [0, 1, 2, 2],
  [0, -1, 0, -1],
  [0, 1, 1, 2],
];

//13가지 도형에 대해서
for (let k = 0; k < 19; k++) {
  //nXm 맵의 모든 점에서 시작 가능
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      //시작점을 기준으로 도형에 속하는 값 더하기
      let count = 0;
      for (let d = 0; d < 4; d++) {
        let nx = i + dx[k][d];
        let ny = j + dy[k][d];

        if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
          count = 0;
          break;
        }
        count += map[nx][ny];
      }
      if (count !== 0) {
        answer = Math.max(answer, count);
      }
    }
  }
}

console.log(answer);

~~~
