https://www.acmicpc.net/problem/7569

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [m, n, h] = input[0].split(" ").map(Number);
//<------------input
let answer = 0;

let redList = []; //익은 토마토 리스트
let greenCount = 0; //익지 않은 토마토 개수

//3차원 공간 만들기
let map = new Array(n).fill().map(() => new Array(m).fill().map(() => new Array(h)));
for (let k = 0; k < h; k++) {
  let arr = input.slice(1 + k * n, 1 + (k + 1) * n).map((v) => v.split(" ").map(Number));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      map[i][j][k] = arr[i][j];

      if (arr[i][j] === 1) {
        redList.push([i, j, k]);
      } //
      else if (arr[i][j] === 0) {
        greenCount++;
      }
    }
  }
}

//6방향
let dx = [-1, 1, 0, 0, 0, 0];
let dy = [0, 0, -1, 1, 0, 0];
let dz = [0, 0, 0, 0, 1, -1];

while (redList.length) {
  let newRedList = [];
  let newRedCount = 0;

  //이번 일차에 처리할 토마토들
  for (let [x, y, z] of redList) {
    for (let d = 0; d < 6; d++) {
      let nx = x + dx[d];
      let ny = y + dy[d];
      let nz = z + dz[d];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m || nz < 0 || nz >= h) {
        continue;
      }
      if (map[nx][ny][nz] !== 0) {
        continue;
      }
      map[nx][ny][nz] = 1;
      newRedList.push([nx, ny, nz]);
      newRedCount++;
    }
  }
  //이번에 새로 익은 토마토가 없다면, 더 이상 진행 할 필요가 없다.
  if (newRedCount === 0) {
    break;
  }
  greenCount -= newRedCount;
  redList = newRedList;
  answer++;
}

answer = greenCount > 0 ? -1 : answer;

console.log(answer);

~~~
