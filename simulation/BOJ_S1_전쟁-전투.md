https://www.acmicpc.net/problem/1303

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [m, n] = input[0].split(" ").map(Number);
let map = input.slice(1, 1 + n).map((v) => v.split(""));
//<------------input
let answer = "";

let bPower = 0;
let wPower = 0;
let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];
let visit = new Array(n).fill().map(() => new Array(m).fill(false));

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (!visit[i][j]) {
      if (map[i][j] === "B") {
        bPower += bfs(i, j, "B");
      } else if (map[i][j] === "W") {
        wPower += bfs(i, j, "W");
      }
    }
  }
}

function bfs(s, e, color) {
  let queue = [[s, e]];
  let count = 1;
  visit[s][e] = true;
  while (queue.length) {
    let [x, y] = queue.shift();

    for (let d = 0; d < 4; d++) {
      let nx = x + dx[d];
      let ny = y + dy[d];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
        continue;
      }
      if (map[nx][ny] !== color) {
        continue;
      }
      if (visit[nx][ny]) {
        continue;
      }
      visit[nx][ny] = true;
      queue.push([nx, ny]);
      count++;
    }
  }
  return count * count;
}

answer = wPower + " " + bPower;

console.log(answer);

~~~

처음에 visit을 쓰지 않으려고 map에서 지나온길을 'X'로 변경하려고 했는데 color를 비교하는 로직이 정상 작동하지 못함  
원본 배열은 가급적 유지하는게 좋겠음  
문제를 잘 읽어야 함 가로 세로가 뒤바뀐 형태도 존재할 수 있음  
