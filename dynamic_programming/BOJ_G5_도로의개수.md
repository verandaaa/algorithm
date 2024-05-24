https://www.acmicpc.net/problem/1577

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let [k] = input[1].split(" ").map(Number);
let arr = input.slice(2, 2 + k).map((v) => v.split(" ").map(Number));
//<------------input
let answer;

function makeKey(v1, v2, v3, v4) {
  return v1 + " " + v2 + " " + v3 + " " + v4;
}

let isOff = new Set();
for (let [a, b, c, d] of arr) {
  //양방향으로 길 차단
  isOff.add(makeKey(a, b, c, d));
  isOff.add(makeKey(c, d, a, b));
}

let dp = new Array(n + 1).fill().map(() => new Array(m + 1).fill(BigInt(-1)));
dp[0][0] = BigInt(0);
//가로 첫줄 초기화
for (let j = 1; j <= m; j++) {
  if (!isOff.has(makeKey(0, j - 1, 0, j))) {
    dp[0][j] = BigInt(1);
  } else {
    break;
  }
}
//세로 첫줄 초기화
for (let i = 1; i <= n; i++) {
  if (!isOff.has(makeKey(i - 1, 0, i, 0))) {
    dp[i][0] = BigInt(1);
  } else {
    break;
  }
}
//나머지
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    let [v1, v2] = [BigInt(dp[i - 1][j]), BigInt(dp[i][j - 1])];
    let v3 = BigInt(0);
    //위쪽 지점에 도달할 수 있었고, 현재까지 이어지는 길이 있을 때
    if (v1 !== BigInt(-1) && !isOff.has(makeKey(i - 1, j, i, j))) {
      v3 += v1;
    }
    //왼쪽 지점에 도달할 수 있었고, 현재까지 이어지는 길이 있을 때
    if (v2 !== BigInt(-1) && !isOff.has(makeKey(i, j - 1, i, j))) {
      v3 += v2;
    }
    dp[i][j] = v3;
  }
}
answer = dp[n][m].toString();

console.log(answer);

~~~
