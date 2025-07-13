https://www.acmicpc.net/problem/14600

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let [s, e] = input[1].split(" ").map(Number);
//<------------input
let answer = -1;

let dx = [
  [1, 0],
  [1, 0],
  [-1, 0],
  [-1, 0],
];
let dy = [
  [0, 1],
  [0, -1],
  [0, 1],
  [0, -1],
];

let m = 2 ** n;
let visit = new Array(m).fill().map(() => new Array(m).fill(0));
visit[m - 1 - (e - 1)][s - 1] = -1; //구멍
dfs(0, 0);

function dfs(c, count) {
  if (c === m * m) {
    if (count === (m * m - 1) / 3) {
      let res = "";
      for (let i = 0; i < m; i++) {
        res += visit[i].join(" ") + "\n";
      }
      answer = res;
      // console.log(res);
      // console.log("------------");
    }
    return;
  }
  let x = Math.floor(c / m);
  let y = c % m;
  if (visit[x][y] === 0) {
    for (let d = 0; d < 4; d++) {
      let newD = [[0, 0]];
      for (let dd = 0; dd < 2; dd++) {
        let nx = x + dx[d][dd];
        let ny = y + dy[d][dd];
        if (nx < 0 || nx >= m || ny < 0 || ny >= m) {
          continue;
        }
        if (visit[nx][ny] !== 0) {
          continue;
        }
        newD.push([dx[d][dd], dy[d][dd]]);
      }
      if (newD.length === 3) {
        for (let k = 0; k < 3; k++) {
          let nx = x + newD[k][0];
          let ny = y + newD[k][1];
          visit[nx][ny] = count + 1;
        }
        //---
        dfs(c + 1, count + 1);
        //---
        for (let k = 0; k < 3; k++) {
          let nx = x + newD[k][0];
          let ny = y + newD[k][1];
          visit[nx][ny] = 0;
        }
      }
    }
  }
  dfs(c + 1, count);
}

console.log(answer);

~~~
