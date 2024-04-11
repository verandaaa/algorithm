https://www.acmicpc.net/problem/20007

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m, x, y] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

//간선 만들기
let edges = new Array(n).fill().map(() => []);
for (let [a, b, c] of arr) {
  edges[a].push([b, c]);
  edges[b].push([a, c]);
}

//시작점에서, 다른 집들간의 최단거리 구하기
let visit = new Array(n).fill(Infinity);
visit[y] = 0;
let queue = [y];
while (queue.length) {
  let from = queue.shift();

  for (let [to, weight] of edges[from]) {
    if (visit[from] + weight < visit[to]) {
      visit[to] = visit[from] + weight;
      queue.push(to);
    }
  }
}
//오름차순 정렬, 가장 가까운 거리부터 간다고 했으므로
visit = visit.sort((a, b) => a - b).map((v) => 2 * v);

//가장 먼 거리가 x보다 크면 모두 방문할 수 없는 케이스
if (visit[n - 1] > x) {
  answer = -1;
  console.log(answer);
  return;
}

//왕복 거리가 k를 넘지 않는 선에서 집 방문하기
let cur = 0;
for (let i = 0; i < n; i++) {
  if (cur + visit[i] <= x) {
    cur += visit[i];
  } else {
    answer++;
    cur = visit[i];
  }
}
//마지막 집은 반복문에서 감지하지 못하므로 개별 처리
answer++;

console.log(answer);

~~~
