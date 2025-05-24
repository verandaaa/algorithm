https://www.acmicpc.net/problem/16174

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

let visit = new Array(n).fill().map(() => new Array(n).fill(false));
visit[0][0] = true;

let queue = [[0, 0]];
while (queue.length) {
  let [x, y] = queue.shift();
  let nx, ny;

  //오
  nx = x;
  ny = y + arr[x][y];
  if (ny >= n) {
    //
  } else {
    if (!visit[nx][ny]) {
      visit[nx][ny] = true;
      queue.push([nx, ny]);
    }
  }

  //아
  nx = x + arr[x][y];
  ny = y;
  if (nx >= n) {
    //
  } else {
    if (!visit[nx][ny]) {
      visit[nx][ny] = true;
      queue.push([nx, ny]);
    }
  }
}

if (visit[n - 1][n - 1]) {
  answer = "HaruHaru";
} else {
  answer = "Hing";
}

console.log(answer);

~~~
