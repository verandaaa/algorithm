https://www.acmicpc.net/problem/22857

# Pass 1 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = 0;

let list = [];

//홀수 추출
for (let i = 0; i < n; i++) {
  if (arr[i] % 2 === 1) {
    list.push(i);
  }
}

//홀수가 제거할 수보다 작다면 n이 정답
if (list.length - m < 0) {
  answer = arr.length;
  console.log(answer);
  return;
}

//홀수를 제외한 최대 길이 구하기
let start = -1;
let end = list[m];
for (let i = 0; i < list.length - m; i++) {
  answer = Math.max(answer, end - start - 1 - m);
  start = list[i];
  end = list[i + m + 1];
}
answer = Math.max(answer, n - start - 1 - m);

console.log(answer);

~~~

# Pass 2 - JavaScript
~~~javascript
let input = require("fs").readFileSync("input.txt").toString().split("\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split('\n');
let [n, m] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
//<------------input
let answer = 0;

let start = 0;
let hc = 0;
let jc = 0;

//나열
for (let i = 0; i < n; i++) {
  //홀수라면
  if (arr[i] % 2 === 1) {
    //찬스 횟수 층가
    hc++;
    //찬스 한계를 넘으면
    if (hc > m) {
      //지금까지의 짝수 최대 길이 정산
      answer = Math.max(answer, jc);
      //찬스 한도 까지
      while (hc > m) {
        //짝수라면 줄임
        if (arr[start] % 2 === 0) {
          jc--;
        }
        //홀수라면 한도 풀림
        else {
          hc--;
        }
        //시작점 초기화
        start++;
      }
    }
  }
  //짝수라면
  else {
    //길이 증가
    jc++;
  }
}
answer = Math.max(answer, jc);

console.log(answer);

~~~
