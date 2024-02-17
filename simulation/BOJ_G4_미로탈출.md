https://www.acmicpc.net/problem/14923

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let [hx, hy] = input[1].split(" ").map(Number);
let [ex, ey] = input[2].split(" ").map(Number);
let map = input.slice(3, 3 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

[hx, hy, ex, ey] = [hx, hy, ex, ey].map((v) => v - 1);

let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];

let visit = new Array(n).fill().map(() => new Array(m).fill().map(() => new Array(2).fill(Infinity)));
visit[hx][hy][0] = 0;
let queue = [[hx, hy, 0]];
while (queue.length) {
  let [x, y, count] = queue.shift();

  if (x === ex && y === ey) {
    break;
  }

  for (let d = 0; d < 4; d++) {
    let nx = x + dx[d];
    let ny = y + dy[d];

    if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
      continue;
    }
    //벽인 경우, 기회가 있을때만
    if (map[nx][ny] === 1 && count === 0) {
      if (visit[x][y][0] + 1 < visit[nx][ny][1]) {
        visit[nx][ny][1] = visit[x][y][0] + 1;
        queue.push([nx, ny, 1]);
      }
    }
    //길인 경우
    if (map[nx][ny] === 0) {
      if (visit[x][y][count] + 1 < visit[nx][ny][count]) {
        visit[nx][ny][count] = visit[x][y][count] + 1;
        queue.push([nx, ny, count]);
      }
    }
  }
}
answer = Math.min(...visit[ex][ey]);

if (answer === Infinity) {
  answer = -1;
}

console.log(answer);

~~~
