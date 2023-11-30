https://www.acmicpc.net/problem/16973

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let map = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
let [h, w, s1, s2, f1, f2] = input[1 + n].split(" ").map(Number);

//<------------input
let answer = 0;

let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];

//맵 복사
let newMap = new Array(n + 1).fill().map(() => new Array(m + 1).fill(0));
for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < m + 1; j++) {
    newMap[i][j] = map[i - 1][j - 1];
  }
}

//누적합
for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < m + 1; j++) {
    newMap[i][j] =
      newMap[i][j] + newMap[i - 1][j] + newMap[i][j - 1] - newMap[i - 1][j - 1];
  }
}

//이동
let queue = [[s1, s2]];
let visit = new Array(n + 1).fill().map(() => new Array(m + 1).fill(Infinity));
visit[s1][s2] = 0;
while (queue.length) {
  let newQueue = [];

  for (let [x, y] of queue) {
    if (x === f1 && y === f2) {
      answer = visit[f1][f2];
      break;
    }

    for (let d = 0; d < 4; d++) {
      //왼쪽 위 모서리
      let nx1 = x + dx[d];
      let ny1 = y + dy[d];
      //오른쪽 아래 모서리
      let nx2 = nx1 + h - 1;
      let ny2 = ny1 + w - 1;

      //왼쪽 위 모서리는 (1,1) 이상
      if (nx1 < 1 || ny1 < 1) {
        continue;
      }
      //오른쪽 아래 모서리는 (n,m) 이하
      if (nx2 > n || ny2 > m) {
        continue;
      }
      //최소값을 갱신하지 못하는 경우
      if (visit[x][y] + 1 >= visit[nx1][ny1]) {
        continue;
      }
      //이동할 구역 내에 장애물이 존재할 경우
      if (
        newMap[nx2][ny2] -
          newMap[nx2 - h][ny2] -
          newMap[nx2][ny2 - w] +
          newMap[nx2 - h][ny2 - w] !==
        0
      ) {
        continue;
      }
      visit[nx1][ny1] = visit[x][y] + 1;
      newQueue.push([nx1, ny1]);
    }
  }

  queue = newQueue;
}

//도달하지 못했다
if (visit[f1][f2] === Infinity) {
  answer = -1;
}

console.log(answer);

~~~
