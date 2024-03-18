https://www.acmicpc.net/problem/11559

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let arr = input.slice(0, 12);
//<------------input
let answer = 0;

//회전시키면 당기고 뒤에 .를 추가하기 편해진다
let map = [];
for (let i = 0; i < 6; i++) {
  let string = [];
  for (let j = 11; j >= 0; j--) {
    string.push(arr[j][i]);
  }
  map.push(string);
}

let [n, m] = [6, 12];
let visit;
let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];

let isPop = true;
while (isPop) {
  isPop = false;

  visit = new Array(n).fill().map(() => new Array(m).fill(false));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (map[i][j] !== "." && !visit[i][j]) {
        isPop = bfs(i, j) || isPop;
      }
    }
  }
  if (isPop) {
    for (let i = 0; i < n; i++) {
      map[i] = map[i].join("").split(".").join("").padEnd(12, ".").split("");
    }
    answer++;
  }
}

function bfs(i, j) {
  let queue = [[i, j]];
  visit[i][j] = true;
  let list = [[i, j]];

  while (queue.length) {
    let [x, y] = queue.shift();

    for (let d = 0; d < 4; d++) {
      let nx = x + dx[d];
      let ny = y + dy[d];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
        continue;
      }
      if (map[i][j] !== map[nx][ny]) {
        continue;
      }
      if (visit[nx][ny]) {
        continue;
      }
      visit[nx][ny] = true;
      queue.push([nx, ny]);
      list.push([nx, ny]);
    }
  }
  if (list.length >= 4) {
    for (let [x, y] of list) {
      map[x][y] = ".";
    }
    return true;
  }
  return false;
}

console.log(answer);

~~~
