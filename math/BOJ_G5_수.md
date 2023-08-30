https://www.acmicpc.net/problem/22943

# Pass 1 - JavaScript
~~~javascript
let input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
//<------------input

let answer = 0;

let max = 10 ** n;
let check = Array.from(Array(max), () => true);
(check[0] = false), (check[1] = false);
let prime = [];
for (let i = 2; i < max; i++) {
  if (!check[i]) {
    continue;
  }
  prime.push(i);
  for (let j = i + i; j < max; j += i) {
    check[j] = false;
  }
}

//첫번째 조건은 prime + prime
let a = Array.from(Array(max), () => false);
for (let i = 0; i < prime.length - 1; i++) {
  for (let j = i + 1; j < prime.length; j++) {
    let sum = prime[i] + prime[j];
    if (sum < max) {
      a[sum] = true;
    }
  }
}

//두번째 조건은 m^k * prime * prime 형태여야 하므로
//prime * prime이 m의 배수인 경우 무시
let b = Array.from(Array(max), () => false);
for (let i = 0; i < prime.length; i++) {
  for (let j = i; j < prime.length; j++) {
    if ((prime[i] * prime[j]) % m === 0) {
      continue;
    }
    for (let k = 1; ; k *= m) {
      let gop = prime[i] * prime[j] * k;
      if (gop < max) {
        b[gop] = true;
      } else {
        break;
      }
    }
  }
}

let visit = Array.from(Array(10), () => false);
//첫 자리 정해준다 (0은 안돼서)
for (let i = 1; i < 10; i++) {
  visit[i] = true;
  dfs(1, i);
  visit[i] = false;
}

console.log(answer);

function dfs(end, x) {
  if (end === n) {
    if (a[x] && b[x]) {
      answer++;
    }
    return;
  }
  for (let i = 0; i < 10; i++) {
    if (!visit[i]) {
      visit[i] = true;
      dfs(end + 1, x * 10 + i);
      visit[i] = false;
    }
  }
}

~~~

소수의 합과 소수의 곱을 이용해서 수를 구하고 그 모든 수로부터 중복수가 없는지 검사하려면 시간초과가 발생한다
소수의 합과 소수의 곱을 통해 나온 수는 체크만 해두고 중복이 없는 수를 만들어서 그 수에 대한 체크를 한다
