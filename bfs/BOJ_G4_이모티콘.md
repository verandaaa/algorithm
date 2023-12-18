https://www.acmicpc.net/problem/14226

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [s] = input[0].split(" ").map(Number);
//<------------input
let answer = 0;

let queue = [[0, 1]]; //클립보드, 화면
let memo = new Array(1001).fill().map(() => new Array(1001).fill(Infinity));
memo[0][1] = 0;

while (true) {
  let [cc, sc] = queue.shift();

  //영선이가 S개의 이모티콘을 화면에 만드는데 걸리는 시간의 최솟값
  if (sc === s) {
    answer = memo[cc][sc];
    break;
  }
  //1.화면에 있는 이모티콘을 모두 복사해서 클립보드에 저장한다.
  if (memo[cc][sc] + 1 < memo[sc][sc]) {
    memo[sc][sc] = memo[cc][sc] + 1;
    queue.push([sc, sc]);
  }
  //2.클립보드에 있는 모든 이모티콘을 화면에 붙여넣기 한다.
  if (memo[cc][sc] + 1 < memo[cc][cc + sc]) {
    memo[cc][cc + sc] = memo[cc][sc] + 1;
    queue.push([cc, cc + sc]);
  }
  //3.화면에 있는 이모티콘 중 하나를 삭제한다.
  if (memo[cc][sc] + 1 < memo[cc][sc - 1]) {
    memo[cc][sc - 1] = memo[cc][sc] + 1;
    queue.push([cc, sc - 1]);
  }
}

console.log(answer);

~~~
