https://www.acmicpc.net/problem/20542

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let str1 = " " + input[1];
let str2 = " " + input[2];
//<------------input
let answer = 0;

let dp = Array.from(Array(n + 1), () => Array(m + 1).fill());
for (let i = 0; i < n + 1; i++) {
  dp[i][0] = i;
}
for (let j = 0; j < m + 1; j++) {
  dp[0][j] = j;
}
for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < m + 1; j++) {
    if (isSame(str1[i], str2[j])) {
      dp[i][j] = dp[i - 1][j - 1];
    } //
    else {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
    }
  }
}

function isSame(ch1, ch2) {
  if (ch1 === "i" && (ch2 === "i" || ch2 === "j" || ch2 === "l")) {
    return true;
  }
  if (ch1 === "v" && (ch2 === "v" || ch2 === "w")) {
    return true;
  }
  if (ch1 === ch2) {
    return true;
  }
  return false;
}

answer = dp[n][m];

console.log(answer);

~~~

LCS와 유사한 편집 거리 알고리즘  
https://hsp1116.tistory.com/41   
