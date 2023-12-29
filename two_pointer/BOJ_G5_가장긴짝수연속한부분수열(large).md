https://www.acmicpc.net/problem/22862

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = 0;

let left = 0;
let right = -1;
let holsuCount = 0;

for (let i = 0; i < n; i++) {
  if (arr[i] % 2 === 1) { //홀수일때
    if (holsuCount < m) { //아직 m만큼 홀수를 받아들일 수 있다면
      right++; //오른쪽으로
      holsuCount++; //홀수 개수 증가
    } //
    else { //받아들일 수 있는 홀수가 꽉찼다
      while (true) {
        if (arr[left++] % 2 === 1) { //왼쪽에서 최초의 홀수 다음까지 이동
          break;
        }
      }
      //가장 왼쪽의 홀수를 지우고 새로운 홀수를 받아들였다
      right++; //오른쪽으로
    }
  } //
  else { //짝수라면 그냥 오른쪽으로
    right++;
  }
  //길이는 left부터 right까지의 수에서 홀수의 개수를 뺀다
  answer = Math.max(answer, right - left + 1 - holsuCount);
}

console.log(answer);

~~~

left와 right로 구간을 나누어 최대 m만큼의 홀수를 제외한 길이를 구하기  
