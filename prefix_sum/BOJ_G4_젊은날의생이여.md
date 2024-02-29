https://www.acmicpc.net/problem/18866

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
//<------------input
let answer = -1;

arr.unshift([0, 0]);

//젊음 행복도 최소 >= 늙음 행복도 최대
//젊음 피로도 최대 <= 늙음 피로도 최소
let youngHappyMin = new Array(n + 2).fill(Infinity);
let oldHappyMax = new Array(n + 2).fill(-1);
let youngFatigueMax = new Array(n + 2).fill(-1);
let oldFatigueMin = new Array(n + 2).fill(Infinity);

//젊음은 1부터 n까지 차례로, 0이라면 이전값 그대로 사용
for (let i = 1; i <= n; i++) {
  youngHappyMin[i] = Math.min(youngHappyMin[i - 1], arr[i][0] !== 0 ? arr[i][0] : youngHappyMin[i - 1]);
  youngFatigueMax[i] = Math.max(youngFatigueMax[i - 1], arr[i][1] !== 0 ? arr[i][1] : youngFatigueMax[i - 1]);
}
//늙음은 n부터 1까지 거꾸로, 0이라면 이전값 그대로 사용
for (let i = n; i >= 1; i--) {
  oldHappyMax[i] = Math.max(oldHappyMax[i + 1], arr[i][0] !== 0 ? arr[i][0] : oldHappyMax[i + 1]);
  oldFatigueMin[i] = Math.min(oldFatigueMin[i + 1], arr[i][1] !== 0 ? arr[i][1] : oldFatigueMin[i + 1]);
}

//k를 기준으로 값 확인
for (let k = n - 1; k >= 1; k--) {
  if (youngHappyMin[k] >= oldHappyMax[k + 1] && youngFatigueMax[k] <= oldFatigueMin[k + 1]) {
    answer = k;
    break;
  }
}

console.log(answer);

~~~
