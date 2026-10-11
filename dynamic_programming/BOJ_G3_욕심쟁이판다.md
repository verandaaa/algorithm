https://www.acmicpc.net/problem/1937

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let map = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];

let visit = new Array(n).fill().map(() => new Array(n).fill(0));

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (visit[i][j] === 0) {
      dfs(i, j);
    }
  }
}

function dfs(x, y) {
  //이미 방문했었던 적이 있다. (x,y)를 방문하여 뻗어나갔을때까지의 최대값을 리턴한다
  if (visit[x][y] !== 0) {
    return visit[x][y];
  }
  //새로 방문하는 곳은 기본적으로 1을 가진다
  visit[x][y] = 1;
  //4방향 탐색
  for (let d = 0; d < 4; d++) {
    let nx = x + dx[d];
    let ny = y + dy[d];

    //맵 밖을 벗어나거나
    if (nx < 0 || nx >= n || ny < 0 || ny >= n) {
      continue;
    }
    //다음 갈 곳이 현재보다 많지 않거나
    if (map[x][y] >= map[nx][ny]) {
      continue;
    }
    //(nx,ny)를 방문하여 쭉 뻗어나가 더이상 뻗지 못할때까지 뻗는다
    //최대값인 visit[x][y]를 리턴받았다면 여기로 돌아와...
    visit[x][y] = Math.max(visit[x][y], dfs(nx, ny) + 1);
  }
  answer = Math.max(answer, visit[x][y]);
  //더 이상 뻗을 수 없다면 돌아가
  return visit[x][y];
}

console.log(answer);

//방문하지 않은 곳이라면, 계속 가지를 뻗어가면서 끝점이 1이된다. 
//재귀에서 돌아오면서 +1 하면서 결국 시작점이 가장 큰 값을 가지게 된다
//방문했던 곳이라면, 가지를 더 뻗을 필요 없이 마지막 값을 가져와서 +1 하면 된다
~~~
