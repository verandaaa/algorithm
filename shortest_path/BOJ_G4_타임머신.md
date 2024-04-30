https://www.acmicpc.net/problem/11657

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";

let visit = new Array(n + 1).fill(Infinity);
visit[1] = 0;
for (let i = 1; i <= n - 1; i++) {
  for (let [from, to, weight] of arr) {
    if (visit[from] === Infinity) {
      continue;
    }
    if (visit[from] + weight >= visit[to]) {
      continue;
    }
    visit[to] = visit[from] + weight;
  }
}

for (let [from, to, weight] of arr) {
  if (visit[from] === Infinity) {
    continue;
  }
  if (visit[from] + weight >= visit[to]) {
    continue;
  }
  answer = "-1";
  break;
}

if (answer !== "-1") {
  for (let i = 2; i <= n; i++) {
    answer += visit[i] === Infinity ? -1 : visit[i];
    answer += "\n";
  }
}

console.log(answer);

~~~
참고) https://yabmoons.tistory.com/365  
  
가중치 음수가 가능함 -> 음수 사이클 존재 가능성 -> 벨만 포드 알고리즘  
  
간선들에대한 검사를 n-1번 하는 이유?  
1 -> 2 -> 3 -> 4  
위와 같은 그래프가 있을때 최악의경우(edges : (3,4) (2,3) (1,2)) n-1번 탐색해야함  

이제, 최단거리를 구하고 한번 더 검사를 한다  
만약 이번 검사에서 최단거리 갱신이 일어난다면 음수 사이클에 의해 최단거리를 보장할 수 없음이 증명된다  
