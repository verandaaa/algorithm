https://www.acmicpc.net/problem/20058

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n, m] = input[0].split(" ").map(Number);
n = Math.pow(2, n);
let map = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
let arr = input[1 + n].split(" ").map(Number);
//<------------input
let answer = "";

let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];

for (let turn = 0; turn < m; turn++) {
  let l = arr[turn];
  //회전
  let size = Math.pow(2, l);
  for (let i = 0; i < n; i += size) {
    for (let j = 0; j < n; j += size) {
      turnMap(i, j, size);
    }
  }
  console.log(map);

  //얼음 양
  let copy = copyMap(0, 0, n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let count = 0;
      for (let d = 0; d < 4; d++) {
        let nx = i + dx[d];
        let ny = j + dy[d];

        if (nx < 0 || nx >= n || ny < 0 || ny >= n) {
          continue;
        }
        if (copy[nx][ny] <= 0) {
          continue;
        }
        count++;
      }
      if (count <= 2) {
        map[i][j]--;
      }
    }
  }
}

let max = 0;
let sum = 0;
let visit = Array.from(Array(n), () => Array(n).fill(false));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (map[i][j] > 0 && !visit[i][j]) {
      let queue = [[i, j]];
      visit[i][j] = true;
      let count = 0;
      while (queue.length) {
        let q = queue.shift();
        let x = q[0];
        let y = q[1];
        sum += map[x][y];
        count++;

        for (let d = 0; d < 4; d++) {
          let nx = x + dx[d];
          let ny = y + dy[d];

          if (nx < 0 || nx >= n || ny < 0 || ny >= n) {
            continue;
          }
          if (visit[nx][ny]) {
            continue;
          }
          if (map[nx][ny] <= 0) {
            continue;
          }
          visit[nx][ny] = true;
          queue.push([nx, ny]);
        }
      }
      max = Math.max(max, count);
    }
  }
}

answer = sum + "\n" + max;

function turnMap(startX, startY, size) {
  //시계방향으로 돌리기
  let copy = copyMap(startX, startY, size);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      map[i + startX][j + startY] = copy[size - 1 - j][i];
    }
  }
}
function copyMap(startX, startY, size) {
  //맵 복사
  let copy = Array.from(Array(size), () => Array(size));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      copy[i][j] = map[startX + i][startY + j];
    }
  }
  return copy;
}

console.log(answer);

~~~

# Pass 2 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n, m] = input[0].split(" ").map(Number);
n = Math.pow(2, n);
let map = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
let arr = input[1 + n].split(" ").map(Number);
//<------------input
let answer = "";

let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];
let temp = Array.from(Array(n), () => Array(n));

for (let turn = 0; turn < m; turn++) {
  let l = arr[turn];
  //회전
  let size = Math.pow(2, l);
  for (let i = 0; i < n; i += size) {
    for (let j = 0; j < n; j += size) {
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          temp[i + c][j + size - 1 - r] = map[i + r][j + c];
        }
      }
    }
  }

  //얼음 양
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let count = 0;
      for (let d = 0; d < 4; d++) {
        let nx = i + dx[d];
        let ny = j + dy[d];

        if (nx < 0 || nx >= n || ny < 0 || ny >= n) {
          continue;
        }
        if (temp[nx][ny] <= 0) {
          continue;
        }
        count++;
      }
      map[i][j] = temp[i][j] - (count <= 2 ? 1 : 0);
    }
  }
}

let max = 0;
let sum = 0;
let visit = Array.from(Array(n), () => Array(n).fill(false));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (map[i][j] > 0 && !visit[i][j]) {
      let queue = [[i, j]];
      visit[i][j] = true;
      let count = 0;
      while (queue.length) {
        let q = queue.shift();
        let x = q[0];
        let y = q[1];
        sum += map[x][y];
        count++;

        for (let d = 0; d < 4; d++) {
          let nx = x + dx[d];
          let ny = y + dy[d];

          if (nx < 0 || nx >= n || ny < 0 || ny >= n) {
            continue;
          }
          if (visit[nx][ny]) {
            continue;
          }
          if (map[nx][ny] <= 0) {
            continue;
          }
          visit[nx][ny] = true;
          queue.push([nx, ny]);
        }
      }
      max = Math.max(max, count);
    }
  }
}

answer = sum + "\n" + max;

console.log(answer);


~~~

사실 map copy하는 과정이 필요 없음  
해당 코드 지우자 속도 5배 가량 상승  
