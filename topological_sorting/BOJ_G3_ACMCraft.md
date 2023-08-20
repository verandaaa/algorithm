https://www.acmicpc.net/problem/1005

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [t] = input[0].split(" ").map(Number);
//<------------input

let answer = "";
let index = 1;
for (let tc = 0; tc < t; tc++) {
  let [n, m] = input[index++].split(" ").map(Number);
  let edges = Array.from(Array(n), () => []);
  let times = input[index++].split(" ").map(Number);
  let queue = Array.from({ length: n }, (_, index) => index);
  let tp = Array.from(Array(n), () => 0);

  for (let i = 0; i < m; i++) {
    let [from, to] = input[index++].split(" ").map(Number);
    edges[from - 1].push(to - 1);
    tp[to - 1]++;
  }
  let find = input[index++] * 1 - 1;

  let dp = Array.from(Array(n), () => 0);
  while (queue.length) {
    queue.sort((a, b) => tp[a] - tp[b]);
    let from = queue.shift();
    for (let to of edges[from]) {
      if (dp[from] + times[from] > dp[to]) {
        dp[to] = dp[from] + times[from];
      }
      tp[to]--;
    }
  }
  let result = dp[find] + times[find];
  answer += result + "\n";
}

console.log(answer);

~~~

# Fail 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [t] = input[0].split(" ").map(Number);
//<------------input

let answer = "";
let index = 1;
for (let tc = 0; tc < t; tc++) {
  let [n, m] = input[index++].split(" ").map(Number);
  let edges = Array.from(Array(n + 1), () => []);
  let weights = input[index++].split(" ").map(Number);
  for (let i = 0; i < m; i++) {
    let [from, to] = input[index++].split(" ").map(Number);
    edges[to].push([from, weights[from - 1]]); //역주행한다
  }
  let find = input[index++] * 1;

  let distance = Array.from(Array(n + 1), () => 0);
  let queue = [find];
  while (queue.length) {
    let from = queue.shift();

    for (let [to, weight] of edges[from]) {
      if (distance[from] + weight >= distance[to]) {
        //긴거리 구하기
        distance[to] = distance[from] + weight;
        queue.push(to);
      }
    }
  }
  let result = Math.max(...distance) + weights[find - 1];
  answer += result + "\n";
}

console.log(answer);

~~~

원래는 다익스트라를 사용해서 구해보려했으나 시간초과가 났다  
위상정렬의 경우 노드당 딱 한번씩만 방문을 하도록 되어있는데  
다익스트라의 경우 bfs를 돌다가 최대값을 갱신하는 경우 그 곳부터 다시 bfs를 돌기 때문에 시간초과가 발생하는 것 같다  
