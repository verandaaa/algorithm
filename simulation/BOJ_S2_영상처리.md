https://www.acmicpc.net/problem/21938

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
let [t] = input[1 + n].split(" ").map(Number);
//<------------input
let answer = 0;

let map = new Array(n).fill().map(() => new Array(m).fill(0));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m * 3; j += 3) {
    let sum = 0;
    for (let k = j; k < j + 3; k++) {
      sum += arr[i][k];
    }
    let avg = sum / 3;
    map[i][j / 3] = avg >= t ? 255 : 0;
  }
}

let count = 0;
let visit = new Array(n).fill().map(() => new Array(m).fill(false));
let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 255 && !visit[i][j]) {
      count++;
      visit[i][j] = true;
      let queue = [[i, j]];
      while (queue.length) {
        let newQueue = [];

        for (let [x, y] of queue) {
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
              continue;
            }

            visit[nx][ny] = true;
            newQueue.push([nx, ny]);
          }
        }

        queue = newQueue;
      }
    }
  }
}

answer = count;

console.log(answer);

~~~
