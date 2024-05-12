https://www.acmicpc.net/problem/17485

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = Infinity;

let prev = new Array(m).fill().map((_, index) => new Array(3).fill(arr[0][index]));
for (let i = 1; i < n; i++) { //현재 열
  let cur = new Array(m).fill().map(() => new Array(3).fill(Infinity));
  for (let j = 0; j < m; j++) { //현재 행
    for (let k = 0; k < 3; k++) { //위에서 어느방향(칸)에서 왔니
      for (let l = 0; l < 3; l++) { //위의 칸에서도 그때 까지의 방향을 가지고 있다
        if (k === l) { //같은 방향은 안된다
          continue;
        }
        if (j + (k - 1) < 0 || j + (k - 1) >= m) { //위에서 올 수 있는 칸이어야 한다
          continue;
        }
        cur[j][k] = Math.min(cur[j][k], prev[j + (k - 1)][l] + arr[i][j]);
      }
    }
  }
  prev = cur;
}

for (let i = 0; i < m; i++) {
  for (let j = 0; j < 3; j++) {
    answer = Math.min(answer, prev[i][j]);
  }
}

console.log(answer);

~~~
