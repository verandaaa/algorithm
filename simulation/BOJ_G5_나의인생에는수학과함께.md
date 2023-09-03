https://www.acmicpc.net/problem/17265

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let map = input
  .slice(1, 1 + n)
  .map((v) => v.split(" ").map((v) => (isNaN(Number(v)) ? v : Number(v))));
//<------------input
let answer = "";
let max = -Infinity;
let min = Infinity;

let dx = [1, 0]; //하 or 우
let dy = [0, 1];

let queue = [[0, 0, map[0][0]]];
while (queue.length) {
  let [x, y, res] = queue.shift();
  if (x === n - 1 && y === n - 1) {
    max = Math.max(max, res);
    min = Math.min(min, res);
  }

  for (let d = 0; d < 2; d++) {
    let nx = x + dx[d]; //기호
    let ny = y + dy[d];
    if (nx >= n || ny >= n) {
      continue;
    }
    for (let dd = 0; dd < 2; dd++) {
      let nnx = nx + dx[dd]; //수
      let nny = ny + dy[dd];
      if (nnx >= n || nny >= n) {
        continue;
      }
      let nres;
      if (map[nx][ny] === "+") {
        nres = res + map[nnx][nny];
      } else if (map[nx][ny] === "-") {
        nres = res - map[nnx][nny];
      } else if (map[nx][ny] === "*") {
        nres = res * map[nnx][nny];
      }
      queue.push([nnx, nny, nres]);
    }
  }
}
answer = max + " " + min;

console.log(answer);

~~~

max와 min을 설정할때 조건을 잘 확인할 것  
