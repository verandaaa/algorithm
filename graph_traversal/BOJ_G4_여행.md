https://www.acmicpc.net/problem/2157

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m, k] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + k).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

let edges = new Array(n + 1).fill().map(() => []);
for (let [a, b, c] of arr) {
  if (a > b) {
    continue;
  }
  edges[a].push([b, c]);
}

//[도시 번호][방문한 도시 수]의 최대 기내식 점수
let dis = new Array(n + 1).fill().map(() => new Array(m + 1).fill(0));
let queue = [[1, 1]];
while (queue.length) {
  let [from, count] = queue.shift();

  //간선들 돌면서
  for (let [to, weight] of edges[from]) {
    //이동수가 m회를 넘으면 무시
    if (count === m) {
      continue;
    }
    //최대값을 갱신할 경우
    if (dis[from][count] + weight > dis[to][count + 1]) {
      dis[to][count + 1] = dis[from][count] + weight;
      queue.push([to, count + 1]);
    }
  }
}
answer = Math.max(...dis[n]);

console.log(answer);

~~~
