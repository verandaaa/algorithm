https://www.acmicpc.net/problem/2533

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, n).map((v) => v.split(" ").map(Number));
//<------------input
let answer;

let edges = new Array(n + 1).fill().map(() => []);
for (let [a, b] of arr) {
  edges[a].push(b);
  edges[b].push(a);
}

let dp = new Array(n + 1).fill().map(() => new Array(2).fill(0)); //0:일반인, 1:특수인
let visit = new Array(n + 1).fill(false);
visit[1] = true;
dfs(1);

function dfs(parent) {
  //특수인일 경우 1표시
  dp[parent][1] = 1;
  //연결된 가족들 중에서
  for (let child of edges[parent]) {
    //방문한 노드는 pass. 자식만 찾는다.
    if (visit[child]) {
      continue;
    }
    visit[child] = true;
    dfs(child);
    //부모가 일반인이라면 자식은 무조건 특수인, 누적시켜 더하기
    dp[parent][0] += dp[child][1];
    //부모가 특수인이라면 자식은 일반인 or 특수인, 누적시켜 더하기
    dp[parent][1] += Math.min(dp[child][0], dp[child][1]);
  }
}

answer = Math.min(...dp[1]);

console.log(answer);

~~~
트리에서 끝까지 갔다가, 값을 만들고 다시 돌아오는 tree+dp 유형
