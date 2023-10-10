https://www.acmicpc.net/problem/13913

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n, m] = input[0].split(" ").map(Number);
//<------------input
let answer = "";

class Info {
  constructor(count, prev) {
    this.count = count;
    this.prev = prev;
  }
}
let queue = [n];
let dp = Array.from(Array(100001), () => null);
dp[n] = new Info(0, null);
while (queue.length) {
  let cur = queue.shift();
  if (cur === m) {
    //만났다
    break;
  }

  for (let next of [cur - 1, cur + 1, cur * 2]) {
    //3가지 경우
    if (dp[next] !== null) {
      //방문했었다면 pass
      continue;
    }
    dp[next] = new Info(dp[cur].count + 1, cur); //다음꺼에 횟수와 이전꺼를 저장
    queue.push(next);
  }
}
let count = dp[m].count;
let path = [m];

let last = m;
while (dp[last].prev !== null) {
  //경로 역탐색
  path.push(dp[last].prev);
  last = dp[last].prev;
}
answer = count + "\n" + path.reverse().join(" ");

console.log(answer);

~~~
