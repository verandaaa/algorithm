https://www.acmicpc.net/problem/2638

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
class Pos {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let answer = 0;
let cheeseCount = 0;
let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 1) {
      cheeseCount++;
    }
  }
}

let newMap = Array.from(Array(n), () => Array(m).fill(0));
while (cheeseCount > 0) {
  answer++;
  outside(); //공기와 닿은 바깥면은 -1로 처리한다
  newMap = copyMap(map);
  inside(); //치즈들을 검사한다
  map = copyMap(newMap);
}

console.log(answer);

function outside() {
  let queue = [new Pos(0, 0)]; //테두리는 무조건 공기에 노출
  map[0][0] = -1;

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
      if (map[nx][ny] !== 0) {
        continue;
      }
      map[nx][ny] = -1;
      queue.push(new Pos(nx, ny));
    }
  }
}

function inside() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (map[i][j] === 1) {
        let count = 0;
        for (let d = 0; d < 4; d++) {
          let nx = i + dx[d];
          let ny = j + dy[d];

          if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
            continue;
          }

          if (map[nx][ny] === -1) {
            //내부X 바깥O
            count++;
          }
        }
        if (count >= 2) {
          newMap[i][j] = 0;
          cheeseCount--;
        }
      } else {
        newMap[i][j] = 0;
      }
    }
  }
}

function copyMap(original) {
  let copy = Array.from(Array(n), () => Array(m).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      copy[i][j] = original[i][j];
    }
  }
  return copy;
}

~~~
