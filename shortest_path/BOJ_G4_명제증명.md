https://www.acmicpc.net/problem/2224

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n);
//let arr = input.slice(1, 1+n).map((v) => v.split(" ").map(Number));
//<------------input

let answer = [];

//A:65 ~ z:122
let distance = Array.from(Array(123), () => Array(123).fill(Infinity));
for (let i = 65; i < 123; i++) {
  for (let j = 65; j < 123; j++) {
    if (i === j) {
      distance[i][j] = 0;
    }
  }
}
for (let string of arr) {
  let from = string.charCodeAt(0);
  let to = string.charCodeAt(5);

  distance[from][to] = 1;
}

for (let k = 65; k < 123; k++) {
  for (let i = 65; i < 123; i++) {
    for (let j = 65; j < 123; j++) {
      distance[i][j] = Math.min(
        distance[i][j],
        distance[i][k] + distance[k][j]
      );
    }
  }
}

for (let i = 65; i < 123; i++) {
  for (let j = 65; j < 123; j++) {
    if (distance[i][j] === Infinity) continue;
    if (i === j) continue;
    //if(distance[i][j]===0) continue 안되는 이유
    //문제에서 p => p를 주는 경우 위에서 distance[p][p]=1로 만들기 때문에
    answer.push(String.fromCharCode(i) + " => " + String.fromCharCode(j));
  }
}

let size = answer.length + "\n";
answer =
  size +
  answer
    .sort((a, b) => {
      if (a[0] !== b[0]) {
        return a[0] > b[0] ? 1 : -1;
      } else {
        return a[5] > b[5] ? 1 : -1;
      }
    })
    .join("\n");

console.log(answer);

~~~

플로이드 와샬만 생각나면 쉽게 풀 수 있는 문제  
그림을 그려서 뭔가 경로의 형태가 나타나면 최단거리 알고리즘 먼저 생각해내자  
