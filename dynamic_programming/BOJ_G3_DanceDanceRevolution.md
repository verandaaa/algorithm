https://www.acmicpc.net/problem/2342

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let arr = input[0].split(" ").map(Number);
arr.pop();
//<------------input

let answer = 0;
let n = arr.length;
let table = [
  [0, 2, 2, 2, 2],
  [0, 1, 3, 4, 3],
  [0, 3, 1, 3, 4],
  [0, 4, 3, 1, 3],
  [0, 3, 4, 3, 1],
];
let dp = Array(n + 1).fill([]);
for (let i = 0; i < n + 1; i++) {
  dp[i] = Array.from(Array(5), () => Array(5).fill(Infinity));
}
dp[0][0][0] = 0;

let queue = [[0, 0, 0]];
while (queue.length) {
  let [z, x, y] = queue.shift();
  if (z === n) {
    continue;
  }
  //왼쪽
  if (dp[z][x][y] + table[x][arr[z]] < dp[z + 1][arr[z]][y]) {
    //이동 뒤에는 두 발이 바뀌어도 상관없음
    dp[z + 1][arr[z]][y] = dp[z][x][y] + table[x][arr[z]];
    dp[z + 1][y][arr[z]] = dp[z][x][y] + table[x][arr[z]];
    queue.push([z + 1, arr[z], y]);
  }
  //오른쪽
  if (dp[z][x][y] + table[y][arr[z]] < dp[z + 1][x][arr[z]]) {
    //이동 뒤에는 두 발이 바뀌어도 상관없음
    dp[z + 1][x][arr[z]] = dp[z][x][y] + table[y][arr[z]];
    dp[z + 1][arr[z]][x] = dp[z][x][y] + table[y][arr[z]];
    queue.push([z + 1, x, arr[z]]);
  }
}
answer = Math.min(...dp[n].flat());

console.log(answer);

~~~

시작) (0,0):2  
1로 이동) (1,0):2  
2로 이동) (2,0):5 (1,2):4  
2로 이동) (2,0):6 (2,2):7 (1,2):5  
4로 이동) (4,0):10 (2,4):8 (1,4):9  
