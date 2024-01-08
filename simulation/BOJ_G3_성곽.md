https://www.acmicpc.net/problem/2234

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [m, n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";

//하우상좌 벽 메모
let wall = new Array(n).fill().map(() => new Array(m).fill());
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    let x = arr[i][j].toString(2).padStart(4, "0");
    wall[i][j] = x.split("").map(Number);
  }
}

let map = new Array(n).fill().map(() => new Array(m).fill(null));
let dx = [1, 0, -1, 0];
let dy = [0, 1, 0, -1];
let roomCnt = 0;
let roomSizeList = [0];
let maxRoomSize = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] !== null) {
      continue;
    }
    roomCnt++;
    map[i][j] = roomCnt;
    let roomSize = 1;
    let queue = [[i, j]];
    while (queue.length) {
      let [x, y] = queue.shift();

      for (let d = 0; d < 4; d++) {
        let nx = x + dx[d];
        let ny = y + dy[d];

        if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
          continue;
        }
        if (wall[x][y][d] === 1) { //벽이라서 갈 수 없다
          continue;
        }
        if (map[nx][ny] !== null) { //이미 체크한 구역이다
          continue;
        }
        map[nx][ny] = roomCnt;
        queue.push([nx, ny]);
        roomSize++;
      }
    }
    maxRoomSize = Math.max(maxRoomSize, roomSize);
    roomSizeList.push(roomSize);
  }
}
answer += roomCnt + "\n" + maxRoomSize + "\n";

//벽 부수면서 확인
let maxConnectRoomSize = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    let [x, y] = [i, j];
    for (let d = 0; d < 4; d++) {
      let nx = x + dx[d];
      let ny = y + dy[d];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
        continue;
      }
      if (wall[x][y][d] === 0) { //벽이 없다
        continue;
      }
      if (map[x][y] === map[nx][ny]) { //부숴도 같은 방이다
        continue;
      }
      //서로 다른 방에 대해서 합친다
      let connectRoomSize = roomSizeList[map[x][y]] + roomSizeList[map[nx][ny]];
      maxConnectRoomSize = Math.max(maxConnectRoomSize, connectRoomSize);
    }
  }
}
answer += maxConnectRoomSize;

console.log(answer);

~~~
