https://www.acmicpc.net/problem/6987

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let arr = input.slice(0, 4).map((v) => v.split(" ").map(Number));
//<------------input
let answer = [0, 0, 0, 0];

let match = [];
for (let i = 0; i < 6; i++) {
  for (let j = i + 1; j < 6; j++) {
    match.push([i, j]);
  }
}
let map = Array.from(Array(6), () => Array(3).fill(0));
dfs(0);

function dfs(count) {
  if (count === 15) {
    for (let i = 0; i < 4; i++) {
      let flag = true;
      for (let j = 0; j < 18; j++) {
        if (map[Math.floor(j / 3)][j % 3] !== arr[i][j]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        answer[i] = 1;
      }
    }
    return;
  }
  let left = match[count][0];
  let right = match[count][1];
  //왼-승 오-패
  map[left][0]++;
  map[right][2]++;
  dfs(count + 1);
  map[left][0]--;
  map[right][2]--;

  //무
  map[left][1]++;
  map[right][1]++;
  dfs(count + 1);
  map[left][1]--;
  map[right][1]--;

  //왼-패 오-승
  map[left][2]++;
  map[right][0]++;
  dfs(count + 1);
  map[left][2]--;
  map[right][0]--;
}
answer = answer.join(" ");

console.log(answer);

~~~

승패/무무/패승 의 3가지 경우, 6*5/2=15개의 매치 => 3^15 => 약 1400만 => 완탐 가능  
flat()은 속도가 느려서 자주 사용은 안된다  
