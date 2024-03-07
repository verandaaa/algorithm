https://www.acmicpc.net/problem/17141

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let map = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = Infinity;

let virusOffList = [];
let notWallCount = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    //바이러스 심기 가능한 곳 저장
    if (map[i][j] === 2) {
      virusOffList.push([i, j]);
    }
    //벽이 아닌 곳 개수
    if (map[i][j] !== 1) {
      notWallCount++;
    }
  }
}

let virusOnList = [];
let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];

dfs(0, 0);

function dfs(end, start) {
  //바이러스를 퍼트릴 m군데를 정했다
  if (end === m) {
    simulate();
    return;
  }
  //바이러스 퍼트릴 조합 구하기
  for (let i = start; i < virusOffList.length; i++) {
    virusOnList.push(i);
    dfs(end + 1, i + 1);
    virusOnList.pop();
  }
}

function simulate() {
  let visit = new Array(n).fill().map(() => new Array(n).fill(Infinity));
  let queue = [];
  let count = 0;
  let lastTime = 0;

  //시작점을 0으로
  for (let i = 0; i < m; i++) {
    let [x, y] = [...virusOffList[virusOnList[i]]];
    visit[x][y] = 0;
    queue.push([x, y]);
    count++;
  }

  //퍼지기 시작
  while (queue.length) {
    let [x, y] = queue.shift();

    for (let d = 0; d < 4; d++) {
      let nx = x + dx[d];
      let ny = y + dy[d];

      if (nx < 0 || nx >= n || ny < 0 || ny >= n) {
        continue;
      }
      if (map[nx][ny] === 1) {
        continue;
      }
      if (visit[x][y] + 1 >= visit[nx][ny]) {
        continue;
      }
      visit[nx][ny] = visit[x][y] + 1;
      queue.push([nx, ny]);
      count++;
      lastTime = Math.max(lastTime, visit[nx][ny]);
    }
  }
  //모든 공간에 바이러스 퍼트림
  if (count === notWallCount) {
    answer = Math.min(answer, lastTime);
  }
}

if (answer === Infinity) {
  answer = -1;
}

console.log(answer);

~~~
