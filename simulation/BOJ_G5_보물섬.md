https://www.acmicpc.net/problem/2589

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let map = input.slice(1, 1 + n);
//<------------input
let answer = 0;

let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === "L") {
      let dis = 0;
      let queue = [[i, j]];
      let visit = Array.from(Array(n), () => Array(m).fill(-1));
      visit[i][j] = 0;
      while (queue.length) {
        let [x, y] = queue.shift();
        dis = Math.max(visit[x][y]);

        for (let d = 0; d < 4; d++) {
          let nx = x + dx[d];
          let ny = y + dy[d];

          if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
            continue;
          }
          if (map[nx][ny] === "W") {
            continue;
          }
          if (visit[nx][ny] >= 0) {
            continue;
          }
          visit[nx][ny] = visit[x][y] + 1;
          queue.push([nx, ny]);
        }
      }
      answer = Math.max(answer, dis);
    }
  }
}

console.log(answer);

~~~
