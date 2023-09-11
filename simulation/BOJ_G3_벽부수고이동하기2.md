https://www.acmicpc.net/problem/14442

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m, k] = input[0].split(" ").map(Number);
let map = input.slice(1, 1 + n).map((v) => v.split("").map(Number));
//<------------input
let answer = -1;

class Pos {
  constructor(x, y, cnt) {
    this.x = x;
    this.y = y;
    this.cnt = cnt;
  }
}
let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];

let queue = [new Pos(0, 0, 0)];
let visit = Array.from(Array(n), () =>
  Array.from(Array(m), () => Array(k + 1).fill(Infinity))
);
visit[0][0][0] = 1;

loop: while (queue.length) {
  let newQueue = [];

  for (let q of queue) {
    if (q.x === n - 1 && q.y === m - 1) {
      answer = visit[q.x][q.y][q.cnt];
      break loop;
    }

    for (let d = 0; d < 4; d++) {
      let nx = q.x + dx[d];
      let ny = q.y + dy[d];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
        continue;
      }
      if (map[nx][ny] === 0) {
        if (visit[q.x][q.y][q.cnt] + 1 < visit[nx][ny][q.cnt]) {
          visit[nx][ny][q.cnt] = visit[q.x][q.y][q.cnt] + 1;
          newQueue.push(new Pos(nx, ny, q.cnt));
        }
      }
      if (map[nx][ny] === 1 && q.cnt < k) {
        if (visit[q.x][q.y][q.cnt] + 1 < visit[nx][ny][q.cnt + 1]) {
          visit[nx][ny][q.cnt + 1] = visit[q.x][q.y][q.cnt] + 1;
          newQueue.push(new Pos(nx, ny, q.cnt + 1));
        }
      }
    }
  }
  queue = newQueue;
}

console.log(answer);

~~~
