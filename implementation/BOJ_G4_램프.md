https://www.acmicpc.net/problem/1034

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n);
let [k] = input[1 + n].split(" ").map(Number);
//<------------input
let answer = 0;

//행 정보를 map에 메모한다
let map = new Map();
for (let i = 0; i < n; i++) {
  map.set(arr[i], map.get(arr[i]) + 1 || 1);
}

//한 행당 전부 1로 만들 수 있는지 검사할 것이다
for (let i = 0; i < n; i++) {
  //0의 개수를 센다
  let zeroCnt = 0;
  for (let j = 0; j < m; j++) {
    if (arr[i][j] === "0") {
      zeroCnt++;
    }
  }
  //0의 개수가 킬 수 있는 횟수보다 크다면 행을 전부 1로 만들 수 없다
  if (zeroCnt > k) {
    continue;
  }
  //껐다켰다 하는 것을 빼면, 0의 개수와 스위치를 누르는 횟수가 일치해야 한다
  if (zeroCnt % 2 !== k % 2) {
    continue;
  }
  //행을 1로 만들었다면, 나와 정확히 일치하는 행들의 개수로 켜진 행의 개수를 구한다
  answer = Math.max(answer, map.get(arr[i]));
}

console.log(answer);

~~~
