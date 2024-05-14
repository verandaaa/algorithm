https://www.acmicpc.net/problem/1456

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [a, b] = input[0].split(" ").map(Number);
//<------------input
let answer = 0;

//sqrt 하는 이유 : 소수의 제곱수 조건 때문에
let n = Math.floor(Math.sqrt(b));
let isSosu = new Array(n + 1).fill(true);
isSosu[1] = false;

for (let i = 2; i <= n; i++) {
  if (isSosu[i]) {
    //소수의 n제곱수 찾기
    for (let j = i * i; j <= b; j *= i) {
      if (j >= a) {
        answer++;
      }
    }
    //소수의 배수는 소수가 아니다
    for (let j = 2 * i; j <= n; j += i) {
      isSosu[j] = false;
    }
  }
}

console.log(answer);

~~~
