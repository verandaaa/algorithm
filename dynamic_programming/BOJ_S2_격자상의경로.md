https://www.acmicpc.net/problem/10164

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m, k] = input[0].split(" ").map(Number);
//<------------input
let answer = 0;

let map = new Array(n + 1).fill(null).map(() => new Array(m + 1).fill(0));
map[1][1] = 1;
for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < m + 1; j++) {
    map[i][j] += map[i - 1][j] + map[i][j - 1];
  }
}

if (k === 0) {
  answer = map[n][m];
} else {
  const [x1, y1] = [Math.floor((k - 1) / m) + 1, ((k - 1) % m) + 1];
  const res1 = map[x1][y1];
  const [x2, y2] = [Math.floor((n * m - k) / m) + 1, ((n * m - k) % m) + 1];
  const res2 = map[x2][y2];
  answer = res1 * res2;
}

console.log(answer);

~~~

백준 마지막 문제 일지도... (서버 종료)
