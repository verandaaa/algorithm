https://www.acmicpc.net/problem/4095

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');

//<------------input
let answer = [];

let line = 0;
while (true) {
  let max = 0;
  let [n, m] = input[line++].split(" ").map(Number);
  let map = input.slice(line, (line += n)).map((v) => v.split(" ").map(Number));

  //padding 만들기(현재 map이 n*m이라서)
  map.unshift(Array.from(Array(m), () => 0));
  for (let i = 0; i < n + 1; i++) {
    map[i].unshift(0);
  }

  let dp = Array.from(Array(n + 1), () => Array(m + 1).fill(0));
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (map[i][j] === 1) {
        //내가 1일 경우에만 유효
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1; //위, 왼쪽, 왼쪽위 중 가장 작은 값 기준 +1
      }
      if (dp[i][j] > max) {
        //최대값 갱신시
        max = dp[i][j];
      }
    }
  }
  answer.push(max);

  if (line + 1 === input.length) {
    //종료 조건
    break;
  }
}
answer = answer.join("\n");

console.log(answer);

/*
dp
[
  [ 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 1, 0, 1, 1 ],
  [ 0, 1, 1, 1, 1, 2 ],
  [ 0, 0, 1, 2, 2, 0 ],
  [ 0, 1, 1, 2, 3, 1 ]
]
*/
~~~
