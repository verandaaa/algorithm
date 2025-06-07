https://www.acmicpc.net/problem/1926

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

let total = 0;
let max = 0;
let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (arr[i][j] === 1) {
      arr[i][j] = 0;
      let count = 1;
      let queue = [[i, j]];
      while (queue.length) {
        let [x, y] = queue.shift();

        for (let d = 0; d < 4; d++) {
          let nx = x + dx[d];
          let ny = y + dy[d];

          if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
            continue;
          }
          if (arr[nx][ny] === 0) {
            continue;
          }

          queue.push([nx, ny]);
          arr[nx][ny] = 0;
          count++;
        }
      }

      total++;
      max = Math.max(max, count);
    }
  }
}

console.log(total + "\n" + max);

~~~
