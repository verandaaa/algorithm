https://www.acmicpc.net/problem/1707

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n);
//<------------input
let answer = "";

let index = 1;
while (index < input.length) {
  let [v, e] = input[index++].split(" ").map(Number);
  let arr = input
    .slice(index, (index += e))
    .map((v) => v.split(" ").map(Number));
  let edges = Array.from(Array(v + 1), () => []);
  for (let [a, b] of arr) {
    edges[a].push(b);
    edges[b].push(a);
  }

  let visit = Array.from(Array(v + 1), () => "W"); //전부 흰색

  let res = "YES";

  loop: for (let i = 1; i <= v; i++) {
    if (visit[i] !== "W") {
      continue;
    }
    visit[i] = "R"; //기본은 빨간색
    let queue = [i];
    while (queue.length) {
      let from = queue.shift();

      for (let to of edges[from]) {
        if (visit[from] === visit[to]) {
          //같은 색으로 이어져 있다면
          res = "NO";
          break loop;
        }
        if (visit[to] === "W") {
          //흰색이라면
          visit[to] = visit[from] === "R" ? "B" : "R"; //서로 다른색으로 이어지게
          queue.push(to);
        }
      }
    }
  }
  answer += res + "\n";
}

console.log(answer);

~~~

그래프를 두 부분으로 나누어야 한다  
visit의 값을 red, blue 2개로 나누어서 이웃이 다른 색을 띄는지 판별한다  
