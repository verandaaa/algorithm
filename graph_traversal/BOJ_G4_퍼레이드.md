https://www.acmicpc.net/problem/16168

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "YES";

let edges = new Array(n + 1).fill().map(() => []);

for (let [a, b] of arr) {
  edges[a].push(b);
  edges[b].push(a);
}

//1. 모든 지점은 연결되어야 한다
let visit = new Array(n + 1).fill(false);
visit[1] = true;
let visitCount = 1;
let queue = [1];
while (queue.length) {
  let from = queue.shift();

  for (let to of edges[from]) {
    if (!visit[to]) {
      visit[to]=true;
      visitCount++;
      queue.push(to);
    }
  }
}
if (visitCount !== n) {
  answer = "NO";
}

//2. 그래프 차수를 확인한다
let hCount = 0;
let jCount = 0;
for (let i = 1; i <= n; i++) {
  if (edges[i].length % 2 === 1) {
    hCount++;
  } //
  else {
    jCount++;
  }
}
if (!(hCount === 0 || hCount === 2)) {
  answer = "NO";
}

console.log(answer);

~~~

오일러경로 : 그래프에 존재하는 모든 간선을 정확히 한 번씩 방문하는 연속된 경로를 의미한다.  
1. 모든 지점은 간선으로 한 덩어리로 이어져야 한다  
2. 정점에 대한 차수의 조건을 만족해야 한다

||무향|유향|
|------|---|---|
|시작점==끝점|모든 정점의 차수가 짝수|모든 정점의 입력차수==출력차수|
|시작점!=끝점|2개의 정점의 차수가 홀수이고 나머지 정점의 개수는 짝수|1개는 입력차수-출력차수=1이고 1개는 출력차수-입력차수=1이고 나머지는 입력차수==출력차수|

참고 : https://algorfati.tistory.com/140  
