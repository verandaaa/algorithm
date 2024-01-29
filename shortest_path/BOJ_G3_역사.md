https://www.acmicpc.net/problem/1613

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, k] = input[0].split(" ").map(Number);
let arr1 = input.slice(1, 1 + k).map((v) => v.split(" ").map(Number));
let [s] = input[1 + k].split(" ").map(Number);
let arr2 = input.slice(2 + k, 2 + k + s).map((v) => v.split(" ").map(Number));
//<------------input
let answer = [];

let distance = new Array(n + 1).fill().map(() => new Array(n + 1).fill(Infinity));

for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < n + 1; j++) {
    if (i === j) {
      distance[i][j] = 0;
    }
  }
}

for (let [from, to] of arr1) {
  distance[from][to] = 1;
}

for (let k = 1; k < n + 1; k++) {
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      distance[i][j] = Math.min(distance[i][j], distance[i][k] + distance[k][j]);
    }
  }
}

for (let [a, b] of arr2) {
  if (distance[a][b] === Infinity && distance[b][a] === Infinity) {
    answer.push(0);
  } else if (distance[a][b] === Infinity) {
    answer.push(1);
  } else if (distance[b][a] === Infinity) {
    answer.push(-1);
  }
}

answer = answer.join("\n");

console.log(answer);

~~~
