https://www.acmicpc.net/problem/1726

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let map = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
let [sx, sy, sd] = input[1 + n].split(" ").map((v) => Number(v) - 1);
let [ex, ey, ed] = input[2 + n].split(" ").map((v) => Number(v) - 1);
//<------------input
let answer = 0;

//동 서 남 북 -> 우 좌 하 상
let dx = [0, 0, 1, -1];
let dy = [1, -1, 0, 0];
let dir = [
  [2, 3],
  [2, 3],
  [0, 1],
  [0, 1],
];

let visit = new Array(n).fill().map(() => new Array(m).fill().map(() => new Array(4).fill(Infinity)));
visit[sx][sy][sd] = 0;
let queue = [[sx, sy, sd]];
while (queue.length) {
  let [x, y, d] = queue.shift();

  if (x === ex && y === ey && d === ed) {
    answer = visit[ex][ey][ed];
    break;
  }

  //명령 1. Go k: k는 1, 2 또는 3일 수 있다.
  //현재 향하고 있는 방향으로 k칸 만큼 움직인다.
  for (let k = 1; k <= 3; k++) {
    let nx = x + dx[d] * k;
    let ny = y + dy[d] * k;

    if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
      break;
    }
    if (map[nx][ny] === 1) {
      break;
    }
    if (visit[x][y][d] + 1 >= visit[nx][ny][d]) {
      continue;
    }
    visit[nx][ny][d] = visit[x][y][d] + 1;
    queue.push([nx, ny, d]);
  }

  //명령 2. Turn dir: dir은 left 또는 right 이며,
  //각각 왼쪽 또는 오른쪽으로 90° 회전한다.
  for (let k = 0; k < 2; k++) {
    let nd = dir[d][k];

    if (visit[x][y][d] + 1 >= visit[x][y][nd]) {
      continue;
    }
    visit[x][y][nd] = visit[x][y][d] + 1;
    queue.push([x, y, nd]);
  }
}

console.log(answer);
~~~
