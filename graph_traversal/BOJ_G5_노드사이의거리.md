https://www.acmicpc.net/problem/1240

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().split('\n');
let [n, m] = input[0].split(" ").map((v) => v * 1);
let arr = input.slice(1, 1 + n - 1).map((v) => v.split(" ").map(Number));
let arr2 = input
  .slice(1 + n - 1, 1 + n - 1 + m)
  .map((v) => v.split(" ").map(Number));
//<------------input
let answer = "";

let edges = Array.from(Array(n + 1), () => []);
for (let [from, to, weight] of arr) {
  edges[from].push([to, weight]);
  edges[to].push([from, weight]);
}

for (let [from, to] of arr2) {
  let queue = [from];
  let visit = Array.from(Array(n + 1), () => Infinity);
  visit[from] = 0;

  while (queue.length) {
    let nfrom = queue.shift();
    if (nfrom === to) {
      answer += visit[nfrom] + "\n";
      break;
    }

    for (let [nto, nweight] of edges[nfrom]) {
      if (visit[nto] !== Infinity) {
        continue;
      }
      visit[nto] = visit[nfrom] + nweight;
      queue.push(nto);
    }
  }
}

console.log(answer);

~~~

플로이드 워셜로도 통과는 가능하나 이 풀이보다 10배 느림  
