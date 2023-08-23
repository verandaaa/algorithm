https://www.acmicpc.net/problem/16724

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let map = input.slice(1, 1 + n).map((v) => v.split(""));
//<------------input

let answer = 0;
let dir = new Map();
dir.set("U", 0);
dir.set("L", 1);
dir.set("D", 2);
dir.set("R", 3);

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    map[i][j] = dir.get(map[i][j]);
  }
}

let visit = Array.from(Array(n), () => Array(m).fill(false));
let dx = [-1, 0, 1, 0]; //상좌하우
let dy = [0, -1, 0, 1];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (visit[i][j]) {
      continue;
    }
    bfs(i, j);
    answer++;
  }
}

console.log(answer);

function bfs(i, j) {
  let queue = [[i, j]];
  while (queue.length) {
    let [x, y] = queue.shift();

    for (let d = 0; d < 4; d++) {
      let nx = x + dx[d];
      let ny = y + dy[d];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
        continue;
      }
      if (visit[nx][ny]) {
        continue;
      }
      if (d === map[x][y]) {
        //내가 가려던 방향
        visit[nx][ny] = true;
        queue.push([nx, ny]);
      } else if ((d + 2) % 4 === map[nx][ny]) {
        //나한테 오는 방향
        visit[nx][ny] = true;
        queue.push([nx, ny]);
      }
    }
  }
}

~~~

분리집합으로도 풀 수 있다  
