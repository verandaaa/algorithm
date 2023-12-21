https://www.acmicpc.net/problem/2253

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + m).map(Number);
//<------------input
let answer = -1;

//갈 수 있는 돌과 없는 돌 체크
let check = new Array(n + 1).fill(true);
for (let x of arr) {
  check[x] = false;
}

//최소한 2로도 갈 수 없다면 즉시 종료
if (!check[2]) {
  console.log(answer);
  return;
}

//최소 점프 횟수 메모
let memo = new Array(n + 1).fill().map(() => new Array(500).fill(Infinity));
memo[2][1] = 1;

//bfs 탐색
//2부터 시작하는 이유, 처음에는 1칸밖에 점프를 하지 못하기 때문
let queue = [[2, 1]]; //현재위치, 몇칸 점프
while (queue.length) {
  let [c, x] = queue.shift();
  if (c === n) {
    answer = Math.min(...memo[n]);
    break;
  }

  //3가지 점프 옵션
  for (let nx of [x - 1, x, x + 1]) {
    if (nx <= 0 || c + nx > n || !check[c + nx]) {
      continue;
    }
    if (memo[c][x] + 1 < memo[c + nx][nx]) {
      memo[c + nx][nx] = memo[c][x] + 1;
      queue.push([c + nx, nx]);
    }
  }
}

console.log(answer);

~~~
bfs로 탐색하는 방법  
시간이 오래 걸린다  

# Pass 2 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1, 1 + m).map(Number);
//<------------input
let answer = -1;

//갈 수 있는 돌과 없는 돌 체크
let check = new Array(n + 1).fill(true);
for (let x of arr) {
  check[x] = false;
}

//최소 점프 횟수 메모
let dp = new Array(n + 1).fill().map(() => new Array(501).fill(Infinity));
dp[1][0] = 0;

for (let i = 2; i < n + 1; i++) {
  if (!check[i]) {
    continue;
  }
  for (let j = 1; j < 500 && j <= i; j++) {
    dp[i][j] = Math.min(dp[i - j][j - 1], dp[i - j][j], dp[i - j][j + 1]) + 1;
    if (isNaN(dp[i][j])) {
      console.log(i);
    }
  }
}
let min = Math.min(...dp[n]);
if (min !== Infinity) {
  answer = min;
}

console.log(answer);

~~~

500을 기준으로 한 이유 : 1 2 3 .... k 의 합은 최대 10000이다  
식을 세우면 (1+k)*k/2 = 10000을 만족하는 k는 대략 500으로 잡으면 된다(혹은 정확한 k값을 구해서 사용하거나)  
j는 499까지 돌아서 498, 499, 500에 접근하므로 dp의 2차원 배열 크기를 501로 잡아야 한다  
점화식을 설명해보자면 예를들어서 i가 7일때  
j가 1이면 7로 올때 6에서 1만큼 점프에서 왔다는 것이고, 6에서 1만큼 점프하게 할 수 있는 0,1,2 구간의 값중 가장 작은 것을 선택  
