https://www.acmicpc.net/problem/16988

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let map = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input

let answer = 0;

class Pos {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let emptySpace = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 0) {
      emptySpace.push(new Pos(i, j));
    }
  }
}

let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];
for (let i = 0; i < emptySpace.length - 1; i++) {
  for (let j = i + 1; j < emptySpace.length; j++) {
    map[emptySpace[i].x][emptySpace[i].y] = 1;
    map[emptySpace[j].x][emptySpace[j].y] = 1;
    bfs();
    map[emptySpace[i].x][emptySpace[i].y] = 0;
    map[emptySpace[j].x][emptySpace[j].y] = 0;
  }
}

function bfs() {
  let sum = 0;
  let visit = Array.from(Array(n), () => Array(m).fill(false));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (map[i][j] === 2 && !visit[i][j]) {
        let count = 1;
        let queue = [new Pos(i, j)];
        visit[i][j] = true;
        let isSafe = false;

        while (queue.length) {
          let q = queue.shift();
          let x = q.x;
          let y = q.y;

          for (let d = 0; d < 4; d++) {
            let nx = x + dx[d];
            let ny = y + dy[d];

            if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
              continue;
            }
            if (visit[nx][ny]) {
              continue;
            }
            if (map[nx][ny] === 0) {
              isSafe = true;
              continue;
            }
            if (map[nx][ny] === 1) {
              continue;
            }
            count++;
            visit[nx][ny] = true;
            queue.push(new Pos(nx, ny));
          }
        }
        if (!isSafe) {
          sum += count;
        }
      }
    }
  }
  answer = Math.max(answer, sum);
}

console.log(answer);

~~~

while문에서 visit검사부분을 위로 올렸더니 시간이 절반가량 감소함  
