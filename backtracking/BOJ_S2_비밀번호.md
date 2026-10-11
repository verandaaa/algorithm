https://www.acmicpc.net/problem/13908

# Pass 1 - JavaScript
~~~javascript
let n, m;
let count;
let fac;
let answer;
console.log(solution());

function solution() {
  let input = require("fs")
    .readFileSync("input.txt")
    .toString()
    .trim()
    .split("\n");
  // let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
  [n, m] = input[0].split(" ").map(Number);
  let arr = [];
  if (m !== 0) {
    arr = input[1].split(" ").map(Number);
  }
  //let arr = input.slice(1, input.length).map((v) => v.split(" ").map(Number));
  //<------------input

  answer = 0;

  count = Array.from(Array(10), () => 0); //확정 각 숫자(0~9) 개수
  for (let x of arr) {
    count[x]++;
  }

  fac = Array.from(Array(n + 1), () => 1); //팩토리얼 값 미리 계산
  for (let i = 1; i <= n; i++) {
    fac[i] = fac[i - 1] * i;
  }

  dfs(0, 0);

  return answer;
}

function dfs(end, sum) {
  if (end === 10) {
    if (sum === n - m) {
      //0~9 숫자의 개수의 총 합이 자릿수(n)
      //ex) [0,0,0,0,0,0,0,1,0,0,2] 3자리 암호
      calculate();
    }
    return;
  }
  for (let i = 0; i <= n - m - sum; i++) {
    count[end] += i;
    dfs(end + 1, sum + i);
    count[end] -= i;
  }
}

function calculate() {
  let parent = fac[n]; //분모는 n!
  let child = 1; //자식은 숫자의 개수만큼 count[i]!
  for (let i = 0; i < 10; i++) {
    if (count[i] !== 0) {
      child *= fac[count[i]];
    }
  }
  answer += parent / child;
  // ex) 7자리 암호, 1이 2개, 2가 3개일 경우
  // 7! / (2! * 3!)
}

~~~
