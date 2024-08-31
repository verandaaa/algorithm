https://www.acmicpc.net/problem/7562

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [t] = input[0].split(" ").map(Number);
//<------------input
let answer = [];

let dx = [-2, -2, -1, -1, 1, 1, 2, 2];
let dy = [-1, 1, -2, 2, -2, 2, -1, 1];

for (let tc = 0; tc < t; tc++) {
  let [n] = input[tc * 3 + 1].split(" ").map(Number);
  let [s1, s2] = input[tc * 3 + 2].split(" ").map(Number);
  let [e1, e2] = input[tc * 3 + 3].split(" ").map(Number);

  let visit = new Array(n).fill().map(() => new Array(n).fill(Infinity));
  visit[s1][s2] = 0;
  let queue = [[s1, s2]];
  while (queue.length) {
    let [x, y] = queue.shift();

    for (let d = 0; d < 8; d++) {
      let nx = x + dx[d];
      let ny = y + dy[d];

      if (nx < 0 || nx >= n || ny < 0 || ny >= n) {
        continue;
      }
      if (visit[x][y] + 1 >= visit[nx][ny]) {
        continue;
      }
      queue.push([nx, ny]);
      visit[nx][ny] = visit[x][y] + 1;
    }
  }
  answer.push(visit[e1][e2]);
}
answer = answer.join("\n");

console.log(answer);

~~~
