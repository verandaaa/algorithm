https://www.acmicpc.net/problem/15270

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
//<------------input
let answer = 0;

let edges = new Array(n + 1).fill(null).map(() => []);
let visit = new Array(n + 1).fill(false);
let count = 0;
for (let [from, to] of arr) {
  edges[from].push(to);
}

function dfs(a) {
  if (a > n) {
    const bonus = count < n ? 1 : 0;
    answer = Math.max(answer, count + bonus);
    return;
  }

  if (!visit[a]) {
    visit[a] = true;
    for (let j = 0; j < edges[a].length; j++) {
      const b = edges[a][j];
      if (visit[b]) {
        continue;
      }
      visit[b] = true;
      count += 2;
      dfs(a + 1);
      visit[b] = false;
      count -= 2;
    }
    visit[a] = false;
  }

  dfs(a + 1);
}

dfs(1);

console.log(answer);

~~~
