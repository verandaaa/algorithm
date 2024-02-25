https://www.acmicpc.net/problem/19535

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n - 1).map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";
let [dCount, gCount] = [0, 0];

//노드별로 이어진 간선의 개수 메모
let edges = new Array(n + 1).fill(0);
for (let [a, b] of arr) {
  edges[a]++;
  edges[b]++;
}

//ㄷ 트리
//?-ㅇ-ㅇ-? 에서 중간노드 2개를 기준으로 자식개수끼리 곱하기
for (let [a, b] of arr) {
  let aChildCount = edges[a] - 1;
  let bChildCount = edges[b] - 1;

  dCount += aChildCount * bChildCount;
}

//ㅈ 트리
//ㅇ-? 에서 노드 1개를 기준으로 자식들에서 3개를 선택하는 경우의 수
for (let i = 1; i <= n; i++) {
  if (edges[i] >= 3) {
    let left = edges[i];
    gCount += (left * (left - 1) * (left - 2)) / (3 * 2 * 1);
  }
}

//트리 개수에 따라 답 구하기
if (dCount > gCount * 3) {
  answer = "D";
} //
else if (dCount < gCount * 3) {
  answer = "G";
} else {
  //
  answer = "DUDUDUNGA";
}

console.log(answer);

~~~
