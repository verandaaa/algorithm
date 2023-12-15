https://www.acmicpc.net/problem/12931

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n] = input[0].split(" ").map(Number);
let B = input[1].split(" ").map(Number);
//<------------input
let answer = 0;

let count = n; //민들어야 하는 0의 개수
for (let i = 0; i < n; i++) {
  if (B[i] === 0) {
    count--;
  }
}

//거꾸로 생각해보기 B에서 A로 만든다.
while (count > 0) {
  //모든 수가 짝수인지 검사
  let flag = true;
  for (let i = 0; i < n; i++) {
    if (B[i] % 2 === 1) {
      flag = false;
      break;
    }
  }
  //모든 수를 2로 나눌 수 있다면 나눈다
  if (flag) {
    for (let i = 0; i < n; i++) {
      B[i] /= 2;
    }
    answer++; //연산 횟수에 추가
  }
  //그렇지 않다면 짝수로 만들기 위해 1을 뺀다
  else {
    for (let i = 0; i < n; i++) {
      if (B[i] > 0 && B[i] % 2 === 1) {
        //1이상의 홀수를
        B[i]--; //1을 빼고
        answer++; //연산 횟수에 추가
        if (B[i] === 0) {
          //0으로 만들었다면
          count--; //만들어야 하는 0의 개수 감소
        }
      }
    }
  }
}

console.log(answer);

~~~
