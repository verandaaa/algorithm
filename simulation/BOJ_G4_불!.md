https://www.acmicpc.net/problem/4179

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let map = input.slice(1, 1 + n).map((v) => v.split(""));
//<------------input
let answer = "IMPOSSIBLE";

let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];

let queue1;
let queue2 = [];
let visit = Array.from(Array(n), () => Array(m).fill(false));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === "J") {
      map[i][j] = ".";
      queue1 = [[i, j, 0]];
      visit[i][j] = true;
    } else if (map[i][j] === "F") {
      queue2.push([i, j]); //불이 없거나, 여러개 있을 수 있다.
    }
  }
}

loop: while (true) {
  //불이 번진다
  let size2 = queue2.length;
  for (let i = 0; i < size2; i++) {
    let [x, y] = queue2.shift();

    for (let d = 0; d < 4; d++) {
      let nx = x + dx[d];
      let ny = y + dy[d];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
        continue;
      }
      if (map[nx][ny] === "#" || map[nx][ny] === "F") {
        continue;
      }
      map[nx][ny] = "F";
      queue2.push([nx, ny]);
    }
  }
  //지훈이 이동
  let size1 = queue1.length;
  for (let i = 0; i < size1; i++) {
    let [x, y, t] = queue1.shift();

    for (let d = 0; d < 4; d++) {
      let nx = x + dx[d];
      let ny = y + dy[d];
      let nt = t + 1;

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
        answer = nt;
        break loop;
      }
      if (map[nx][ny] === "#" || map[nx][ny] === "F") {
        continue;
      }
      if (visit[nx][ny]) {
        continue;
      }
      visit[nx][ny] = true;
      queue1.push([nx, ny, nt]);
    }
  }

  if (!queue1.length) {
    break loop;
  }
}

console.log(answer);

~~~
