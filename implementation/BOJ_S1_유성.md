https://www.acmicpc.net/problem/10703

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(""));
//<------------input
let answer = "";

let lastStoneIndexList = new Array(m).fill(-1);
let firstGroundIndexList = new Array(m).fill(0);
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (arr[i][j] === "X") {
      lastStoneIndexList[j] = i;
    } else if (arr[i][j] === "#" && firstGroundIndexList[j] === 0) {
      firstGroundIndexList[j] = i;
    }
  }
}
let distance = Infinity;
for (let j = 0; j < m; j++) {
  if (lastStoneIndexList[j] === -1) {
    continue;
  }
  distance = Math.min(
    distance,
    firstGroundIndexList[j] - lastStoneIndexList[j] - 1
  );
}

answer = new Array(n).fill().map(() => new Array(m).fill("."));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (arr[i][j] === "X") {
      answer[i + distance][j] = "X";
    } else if (arr[i][j] === "#") {
      answer[i][j] = "#";
    }
  }
}

answer = answer.map((item) => item.join("")).join("\n");

console.log(answer);

~~~
